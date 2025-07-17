using System;

namespace WMS.Api.Models;

public class SectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public int WarehouseId { get; set; }
  public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
  public ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();
}
