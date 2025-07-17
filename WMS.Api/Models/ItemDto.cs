using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class ItemDto
{
  public int Id { get; set; }
  public int ProductId { get; set; }
  public ProductDto? Product { get; set; }
  public ItemStatus Status { get; set; }
}
