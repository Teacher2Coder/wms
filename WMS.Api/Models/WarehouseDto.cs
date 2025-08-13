using System;
using WMS.Api.Entities;
namespace WMS.Api.Models;

public class WarehouseDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Location { get; set; }
  public string? Description { get; set; }

  public int TotalInventory => Sections?.Sum(s => s.TotalInventory) ?? 0;
  public int AvailableInventory => Sections?.Sum(s => s.AvailableInventory) ?? 0;
  public int ReservedInventory => Sections?.Sum(s => s.ReservedInventory) ?? 0;
  public int InTransitInventory => Sections?.Sum(s => s.InTransitInventory) ?? 0;
  public int DamagedInventory => Sections?.Sum(s => s.DamagedInventory) ?? 0;
  public int ExpiredInventory => Sections?.Sum(s => s.ExpiredInventory) ?? 0;
  public int OutOfStockInventory => Sections?.Sum(s => s.OutOfStockInventory) ?? 0;
  public ICollection<SectionDto> Sections { get; set; } = new List<SectionDto>();
}