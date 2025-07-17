using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Item
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  public ItemStatus Status { get; set; }

  [ForeignKey("ProductId")]
  public int ProductId { get; set; }

  public Product? Product { get; set; }

  public Item(int productId)
  {
    ProductId = productId;
    Status = ItemStatus.Available;
  }
}
