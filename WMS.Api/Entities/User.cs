using System;
using System.ComponentModel.DataAnnotations;

namespace WMS.Api.Entities;

public class User
{
  public int Id { get; set; }
  
  [Required]
  [MaxLength(50)]
  public required string Username { get; set; }
  
  [Required]
  public required string PasswordHash { get; set; }
  
  [Required]
  public Role Role { get; set; } = Role.Employee;
  
  [MaxLength(50)]
  public string? FirstName { get; set; }
  
  [MaxLength(50)]
  public string? LastName { get; set; }
  
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  
  public DateTime? LastLoginAt { get; set; }
  
  public bool IsActive { get; set; } = true;
}
