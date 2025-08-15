using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class ItemDto
{
  public int Id { get; set; }
  public string SerialNumber { get; set; } = string.Empty;
  public ItemStatus Status { get; set; }
  public int ProductId { get; set; }
  public int SectionId { get; set; }
}
