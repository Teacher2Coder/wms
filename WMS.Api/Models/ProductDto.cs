using System;

namespace WMS.Api.Models;

public class ProductDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Sku { get; set; } = string.Empty;
  public string? Description { get; set; }
  public ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();
}
