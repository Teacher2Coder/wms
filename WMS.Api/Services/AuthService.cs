using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WMS.Api.DbContexts;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Services;

public class AuthService : IAuthService
{
  private readonly WarehouseContext _context;
  private readonly IMapper _mapper;
  private readonly IConfiguration _configuration;
  private readonly ILogger<AuthService> _logger;

  public AuthService(
    WarehouseContext context,
    IMapper mapper,
    IConfiguration configuration,
    ILogger<AuthService> logger)
  {
    _context = context;
    _mapper = mapper;
    _configuration = configuration;
    _logger = logger;
  }

  public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
  {
    var user = await _context.Users
      .FirstOrDefaultAsync(u => u.Username == loginDto.Username && u.IsActive);

    if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
    {
      return null;
    }

    // Update last login time
    user.LastLoginAt = DateTime.UtcNow;
    await _context.SaveChangesAsync();

    var token = GenerateJwtToken(user);
    var userDto = _mapper.Map<UserDto>(user);

    return new AuthResponseDto
    {
      Token = token,
      User = userDto,
      ExpiresAt = DateTime.UtcNow.AddHours(24) // Token expires in 24 hours
    };
  }

  public async Task<UserDto?> RegisterAsync(RegisterDto registerDto)
  {
    // Check if username already exists
    if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
    {
      return null;
    }

    var user = _mapper.Map<User>(registerDto);
    user.PasswordHash = HashPassword(registerDto.Password);
    user.CreatedAt = DateTime.UtcNow;
    user.IsActive = true;

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return _mapper.Map<UserDto>(user);
  }

  public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
  {
    var user = await _context.Users.FindAsync(userId);
    if (user == null || !VerifyPassword(changePasswordDto.CurrentPassword, user.PasswordHash))
    {
      return false;
    }

    user.PasswordHash = HashPassword(changePasswordDto.NewPassword);
    await _context.SaveChangesAsync();

    return true;
  }

  public string GenerateJwtToken(User user)
  {
    var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured");
    var jwtIssuer = _configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("JWT Issuer not configured");
    var jwtAudience = _configuration["Jwt:Audience"] ?? throw new InvalidOperationException("JWT Audience not configured");

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
      new Claim(ClaimTypes.Role, user.Role.ToString()),
      new Claim("firstName", user.FirstName ?? ""),
      new Claim("lastName", user.LastName ?? ""),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var token = new JwtSecurityToken(
      issuer: jwtIssuer,
      audience: jwtAudience,
      claims: claims,
      expires: DateTime.UtcNow.AddHours(24),
      signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  public string HashPassword(string password)
  {
    return BCrypt.Net.BCrypt.HashPassword(password, 12);
  }

  public bool VerifyPassword(string password, string hash)
  {
    try
    {
      return BCrypt.Net.BCrypt.Verify(password, hash);
    }
    catch
    {
      return false;
    }
  }

  public async Task<UserDto?> GetUserByIdAsync(int userId)
  {
    var user = await _context.Users.FindAsync(userId);
    return user != null ? _mapper.Map<UserDto>(user) : null;
  }

  public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
  {
    var users = await _context.Users
      .Where(u => u.IsActive)
      .OrderBy(u => u.Username)
      .ToListAsync();

    return _mapper.Map<IEnumerable<UserDto>>(users);
  }

  public async Task<bool> UpdateUserAsync(int userId, UserDto userDto)
  {
    var user = await _context.Users.FindAsync(userId);
    if (user == null)
    {
      return false;
    }

    // Check if username is being changed and if it already exists
    if (user.Username != userDto.Username &&
        await _context.Users.AnyAsync(u => u.Username == userDto.Username && u.Id != userId))
    {
      return false;
    }

    user.Username = userDto.Username;
    user.FirstName = userDto.FirstName;
    user.LastName = userDto.LastName;
    user.Role = userDto.Role;
    user.IsActive = userDto.IsActive;

    await _context.SaveChangesAsync();
    return true;
  }

  public async Task<bool> DeleteUserAsync(int userId)
  {
    var user = await _context.Users.FindAsync(userId);
    if (user == null)
    {
      return false;
    }

    // Soft delete by setting IsActive to false
    user.IsActive = false;
    await _context.SaveChangesAsync();

    return true;
  }
}
