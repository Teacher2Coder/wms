using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Section
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(100)]
  public string Name { get; set; }

  [MaxLength(500)]
  public string? Description { get; set; }

  [ForeignKey("WarehouseId")]
  public int WarehouseId { get; set; }

  public Warehouse? Warehouse { get; set; }

  public ICollection<Item> Items { get; set; } = new List<Item>();

  public Section()
  {
    Name = string.Empty;
  }

  public Section(string name, int warehouseId)
  {
    Name = name;
    WarehouseId = warehouseId;
  }
}
