using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WMS.Api.Models;
using WMS.Api.Entities;
using WMS.Api.Services;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly IAuthService _authService;
  private readonly ILogger<AuthController> _logger;

  public AuthController(IAuthService authService, ILogger<AuthController> logger)
  {
    _authService = authService;
    _logger = logger;
  }

  [HttpPost("login")]
  public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var result = await _authService.LoginAsync(loginDto);
    
    if (result == null)
    {
      return Unauthorized(new { message = "Invalid username or password" });
    }

    _logger.LogInformation("User {Username} logged in successfully", loginDto.Username);
    return Ok(result);
  }

  [HttpPost("register")]
  [Authorize(Roles = "Admin,Manager")]
  public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var result = await _authService.RegisterAsync(registerDto);
    
    if (result == null)
    {
      return BadRequest(new { message = "Username already exists" });
    }

    _logger.LogInformation("New user {Username} registered successfully", registerDto.Username);
    return CreatedAtAction(nameof(GetUser), new { id = result.Id }, result);
  }

  [HttpPost("change-password")]
  [Authorize]
  public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var userId = GetCurrentUserId();
    if (userId == null)
    {
      return Unauthorized();
    }

    var success = await _authService.ChangePasswordAsync(userId.Value, changePasswordDto);
    
    if (!success)
    {
      return BadRequest(new { message = "Current password is incorrect" });
    }

    _logger.LogInformation("User {UserId} changed password successfully", userId);
    return Ok(new { message = "Password changed successfully" });
  }

  [HttpGet("me")]
  [Authorize]
  public async Task<ActionResult<UserDto>> GetCurrentUser()
  {
    var userId = GetCurrentUserId();
    if (userId == null)
    {
      return Unauthorized();
    }

    var user = await _authService.GetUserByIdAsync(userId.Value);
    if (user == null)
    {
      return NotFound();
    }

    return Ok(user);
  }

  [HttpGet("users")]
  [Authorize(Roles = "Admin,Manager")]
  public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
  {
    var users = await _authService.GetAllUsersAsync();
    return Ok(users);
  }

  [HttpGet("users/{id}")]
  [Authorize(Roles = "Admin,Manager")]
  public async Task<ActionResult<UserDto>> GetUser(int id)
  {
    var user = await _authService.GetUserByIdAsync(id);
    if (user == null)
    {
      return NotFound();
    }

    return Ok(user);
  }

  [HttpPut("profile")]
  [Authorize]
  public async Task<IActionResult> UpdateProfile([FromBody] UserDto userDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var userId = GetCurrentUserId();
    if (userId == null)
    {
      return Unauthorized();
    }

    var success = await _authService.UpdateUserAsync(userId.Value, userDto);
    if (!success)
    {
      return BadRequest(new { message = "Failed to update profile. Username may already exist." });
    }

    _logger.LogInformation("User {UserId} updated their profile successfully", userId);
    return Ok(new { message = "Profile updated successfully" });
  }

  [HttpPut("users/{id}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    if (id != userDto.Id)
    {
      return BadRequest(new { message = "ID mismatch" });
    }

    var success = await _authService.UpdateUserAsync(id, userDto);
    if (!success)
    {
      return BadRequest(new { message = "Failed to update user. Username may already exist." });
    }

    _logger.LogInformation("User {UserId} updated successfully", id);
    return Ok(new { message = "User updated successfully" });
  }

  [HttpDelete("users/{id}")]
  [Authorize(Roles = "Admin")]
  public async Task<IActionResult> DeleteUser(int id)
  {
    // Prevent admin from deleting themselves
    var currentUserId = GetCurrentUserId();
    if (currentUserId == id)
    {
      return BadRequest(new { message = "Cannot delete your own account" });
    }

    var success = await _authService.DeleteUserAsync(id);
    if (!success)
    {
      return NotFound();
    }

    _logger.LogInformation("User {UserId} deleted successfully", id);
    return Ok(new { message = "User deleted successfully" });
  }

  [HttpPost("refresh")]
  [Authorize]
  public async Task<ActionResult<AuthResponseDto>> RefreshToken()
  {
    var userId = GetCurrentUserId();
    if (userId == null)
    {
      return Unauthorized();
    }

    var user = await _authService.GetUserByIdAsync(userId.Value);
    if (user == null)
    {
      return Unauthorized();
    }

    // For simplicity, we'll generate a new token with the current user data
    // May need to implement refresh tokens
    var userEntity = new User
    {
      Id = user.Id,
      Username = user.Username,
      Role = user.Role,
      FirstName = user.FirstName,
      LastName = user.LastName,
      PasswordHash = "", // Not needed for token generation
      CreatedAt = user.CreatedAt,
      IsActive = user.IsActive
    };

    var token = _authService.GenerateJwtToken(userEntity);

    return Ok(new AuthResponseDto
    {
      Token = token,
      User = user,
      ExpiresAt = DateTime.UtcNow.AddHours(24)
    });
  }

  private int? GetCurrentUserId()
  {
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? 
                      User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
    return int.TryParse(userIdClaim, out var userId) ? userId : null;
  }
}
