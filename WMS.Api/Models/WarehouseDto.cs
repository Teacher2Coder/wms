using System;
using WMS.Api.Entities;
namespace WMS.Api.Models;

public class WarehouseDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Location { get; set; }
  public string? Description { get; set; }

  public int TotalInventory => Sections.Sum(s => s.TotalInventory);
  public int AvailableInventory => Sections.Sum(s => s.AvailableInventory);
  public int ReservedInventory => Sections.Sum(s => s.ReservedInventory);
  public int InTransitInventory => Sections.Sum(s => s.InTransitInventory);
  public int DamagedInventory => Sections.Sum(s => s.DamagedInventory);
  public int ExpiredInventory => Sections.Sum(s => s.ExpiredInventory);
  public ICollection<SectionDto> Sections { get; set; } = new List<SectionDto>();
}