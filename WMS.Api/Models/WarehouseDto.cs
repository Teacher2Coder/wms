using System;
using WMS.Api.Entities;
namespace WMS.Api.Models;

public class WarehouseDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Location { get; set; }
  public string? Description { get; set; }

  public int TotalInventory => Sections.Sum(s => s.Items.Count);
  public int AvailableInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.Available));
  public int ReservedInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.Reserved));
  public int InTransitInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.InTransit));
  public int DamagedInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.Damaged));
  public int ExpiredInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.Expired));
  public int OutOfStockInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.OutOfStock));
  public int LowStockInventory => Sections.Sum(s => s.Items.Count(i => i.Status == ItemStatus.LowStock));
  public ICollection<SectionDto> Sections { get; set; } = new List<SectionDto>();
}
