using WMS.Api.Entities;

namespace WMS.Api.Models;

public class UserDto
{
  public int Id { get; set; }
  public string Username { get; set; } = string.Empty;
  public Role Role { get; set; }
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public DateTime CreatedAt { get; set; }
  public DateTime? LastLoginAt { get; set; }
  public bool IsActive { get; set; }
}

public class LoginDto
{
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}

public class RegisterDto
{
  public string Username { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
  public string? FirstName { get; set; }
  public string? LastName { get; set; }
  public Role Role { get; set; } = Role.Employee;
}

public class AuthResponseDto
{
  public string Token { get; set; } = string.Empty;
  public UserDto User { get; set; } = new UserDto();
  public DateTime ExpiresAt { get; set; }
}

public class ChangePasswordDto
{
  public string CurrentPassword { get; set; } = string.Empty;
  public string NewPassword { get; set; } = string.Empty;
}
