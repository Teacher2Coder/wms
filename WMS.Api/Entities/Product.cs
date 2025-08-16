using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Product
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  [Required]
  [MaxLength(100)]
  public string Name { get; set; }

  [Required]
  [MaxLength(100)]
  public string Sku { get; set; }

  [MaxLength(500)]
  public string? Description { get; set; }

  public ICollection<Item> Items { get; set; } = new List<Item>();

  public Product(string name, string sku)
  {
    Name = name;
    Sku = sku;
  }
}