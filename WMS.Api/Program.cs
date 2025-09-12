using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;

using WMS.Api.DbContexts;
using WMS.Api.Services;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

if (environment == Environments.Development)
{
  builder.Host.UseSerilog((context, loggerConfiguration) => loggerConfiguration
    .MinimumLevel.Debug()
    .WriteTo.Console()
  );
}
else
{
  builder.Host.UseSerilog((context, loggerConfiguration) => loggerConfiguration
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.ApplicationInsights(
      new TelemetryConfiguration()
      {
        InstrumentationKey = builder.Configuration["ApplicationInsights:InstrumentationKey"]
      },
      TelemetryConverter.Traces
    )
  );
}

builder.Services.AddControllers(options =>
{
  options.ReturnHttpNotAcceptable = true;
}).AddNewtonsoftJson()
.AddXmlDataContractSerializerFormatters();

builder.Services.AddProblemDetails();

builder.Services.AddDbContext<WarehouseContext>(
    dbContextOptions => dbContextOptions.UseNpgsql(
    builder.Configuration["ConnectionStrings:WarehouseDBConnectionString"]
  )
);

builder.Services.AddScoped<IWarehouseRepository, WarehouseRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowReactApp", policy =>
  {
    policy.WithOrigins(builder.Configuration["ReactAppUrl"])
      .AllowAnyHeader()
      .AllowAnyMethod();
  });
});

// Add Authentication
builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = builder.Configuration["Jwt:Issuer"],
    ValidAudience = builder.Configuration["Jwt:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(
      Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? 
        throw new InvalidOperationException("JWT Key not configured"))),
    ClockSkew = TimeSpan.Zero
  };
});

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler();
}

app.UseForwardedHeaders();

app.UseHttpsRedirection();

// Configure static files to serve the React app (only if dist folder exists)
var clientDistPath = Path.Combine(builder.Environment.ContentRootPath, "..", "wms-client", "dist");
if (Directory.Exists(clientDistPath))
{
  app.UseStaticFiles(new StaticFileOptions
  {
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(clientDistPath),
    RequestPath = ""
  });
}

app.UseRouting();

// Use CORS
app.UseCors("AllowReactApp");

// Use Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// SPA fallback - serve index.html for any non-API routes (only if dist folder exists)
if (Directory.Exists(clientDistPath))
{
  app.MapFallbackToFile("index.html", new StaticFileOptions
  {
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(clientDistPath)
  });
}
else
{
  Log.Warning("React app dist folder not found at {DistPath}. Run 'npm run build' in wms-client to build the React app.", clientDistPath);
}

app.Run();