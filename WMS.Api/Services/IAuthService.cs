using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Services;

public interface IAuthService
{
  Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
  Task<UserDto?> RegisterAsync(RegisterDto registerDto);
  Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
  string GenerateJwtToken(User user);
  string HashPassword(string password);
  bool VerifyPassword(string password, string hash);
  Task<UserDto?> GetUserByIdAsync(int userId);
  Task<IEnumerable<UserDto>> GetAllUsersAsync();
  Task<bool> UpdateUserAsync(int userId, UserDto userDto);
  Task<bool> DeleteUserAsync(int userId);
}
