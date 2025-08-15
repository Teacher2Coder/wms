using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class SectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public int WarehouseId { get; set; }
  public ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();
  public int TotalInventory => Items?.Count ?? 0;
  public int AvailableInventory => Items?.Count(i => i.Status == ItemStatus.Available) ?? 0;
  public int ReservedInventory => Items?.Count(i => i.Status == ItemStatus.Reserved) ?? 0;
  public int InTransitInventory => Items?.Count(i => i.Status == ItemStatus.InTransit) ?? 0;
  public int DamagedInventory => Items?.Count(i => i.Status == ItemStatus.Damaged) ?? 0;
  public int ExpiredInventory => Items?.Count(i => i.Status == ItemStatus.Expired) ?? 0;
  public int OutOfStockInventory => Items?.GroupBy(i => i.ProductId).Count(g => !g.Any(i => i.Status == ItemStatus.Available)) ?? 0;
}
