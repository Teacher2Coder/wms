using System;
using System.ComponentModel.DataAnnotations;

namespace WMS.Api.Entities;

public class Action
{
  public int Id { get; set; }
  
  [Required]
  public int UserId { get; set; }
  
  [Required]
  public User User { get; set; } = null!;
  
  [Required]
  [MaxLength(100)]
  public required string ActionType { get; set; } // e.g., "CREATE", "UPDATE", "DELETE", "VIEW"
  
  [Required]
  [MaxLength(100)]
  public required string EntityType { get; set; } // e.g., "Warehouse", "Product", "User", "Order"
  
  public int? EntityId { get; set; } // ID of the affected entity (nullable for bulk operations)
  
  [MaxLength(200)]
  public string? EntityName { get; set; } // Name/identifier of the affected entity
  
  [MaxLength(500)]
  public string? Description { get; set; } // Human-readable description of the action
  
  public string? OldValues { get; set; } // JSON string of old values (for updates)
  
  public string? NewValues { get; set; } // JSON string of new values (for creates/updates)
  
  [MaxLength(50)]
  public string? IpAddress { get; set; } // IP address of the user
  
  [MaxLength(500)]
  public string? UserAgent { get; set; } // Browser/client information
  
  public DateTime Timestamp { get; set; } = DateTime.UtcNow;
  
  public bool IsSuccessful { get; set; } = true; // Track if the action succeeded or failed
  
  [MaxLength(1000)]
  public string? ErrorMessage { get; set; } // Error details if action failed
}
