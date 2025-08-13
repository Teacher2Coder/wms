using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class SectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public int WarehouseId { get; set; }
  public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
  public int TotalInventory => Products?.Sum(p => p.Items?.Count ?? 0) ?? 0;
  public int AvailableInventory => Products?.Sum(p => p.Items?.Count(i => i.Status == ItemStatus.Available) ?? 0) ?? 0;
  public int ReservedInventory => Products?.Sum(p => p.Items?.Count(i => i.Status == ItemStatus.Reserved) ?? 0) ?? 0;
  public int InTransitInventory => Products?.Sum(p => p.Items?.Count(i => i.Status == ItemStatus.InTransit) ?? 0) ?? 0;
  public int DamagedInventory => Products?.Sum(p => p.Items?.Count(i => i.Status == ItemStatus.Damaged) ?? 0) ?? 0;
  public int ExpiredInventory => Products?.Sum(p => p.Items?.Count(i => i.Status == ItemStatus.Expired) ?? 0) ?? 0;
  public int OutOfStockInventory => Products?.Count(p => (p.Items?.Count(i => i.Status == ItemStatus.Available) ?? 0) == 0) ?? 0;
}
