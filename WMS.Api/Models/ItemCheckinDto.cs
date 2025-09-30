using System;

namespace WMS.Api.Models;

public class ItemCheckinDto
{
  public string SerialNumber { get; set; } = string.Empty;
  public string Sku { get; set; } = string.Empty;
  public int Warehouse { get; set; }
  public int Section { get; set; }
}
