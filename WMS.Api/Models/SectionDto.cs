using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class SectionDto
{
  public int Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Description { get; set; }
  public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
  public int TotalInventory => Products.Sum(p => p.Items.Count);
  public int AvailableInventory => Products.Sum(p => p.Items.Count(i => i.Status == ItemStatus.Available));
  public int ReservedInventory => Products.Sum(p => p.Items.Count(i => i.Status == ItemStatus.Reserved));
  public int InTransitInventory => Products.Sum(p => p.Items.Count(i => i.Status == ItemStatus.InTransit));
  public int DamagedInventory => Products.Sum(p => p.Items.Count(i => i.Status == ItemStatus.Damaged));
  public int ExpiredInventory => Products.Sum(p => p.Items.Count(i => i.Status == ItemStatus.Expired));
}
