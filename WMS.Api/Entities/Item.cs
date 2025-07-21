using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Item
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  public string SerialNumber { get; set; }

  public ItemStatus Status { get; set; }

  [ForeignKey("ProductId")]
  public int ProductId { get; set; }

  public Product? Product { get; set; }

  // Parameterless constructor for Entity Framework
  public Item()
  {
    Status = ItemStatus.Available;
  }

  public Item(int productId, string productSku)
  {
    ProductId = productId;
    // Don't set SerialNumber here since Id might be 0
    // It should be set after the entity is saved or explicitly in seeding
    Status = ItemStatus.Available;
  }
}
