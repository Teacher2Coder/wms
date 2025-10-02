using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class ItemUpdateDto
{
  public string SerialNumber { get; set; } = string.Empty;
  public ItemStatus Status { get; set; }
  public int Warehouse { get; set; }
  public int Section { get; set; }
}
