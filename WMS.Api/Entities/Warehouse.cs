using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Warehouse
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(100)]
  public string Name { get; set; }

  [MaxLength(200)]
  public string? Location { get; set; }

  [MaxLength(500)]
  public string? Description { get; set; }

  // Navigation properties
  public ICollection<Section> Sections { get; set; } = new List<Section>();

  public Warehouse(string name)
  {
    Name = name;
  }
}
