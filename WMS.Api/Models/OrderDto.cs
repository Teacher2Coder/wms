using System;
using WMS.Api.Entities;

namespace WMS.Api.Models;

public class OrderDto
{
  public int Id { get; set; }
  public string OrderNumber { get; set; } = string.Empty;
  public DateTime OrderDate { get; set; }
  public string CustomerName { get; set; } = string.Empty;
  public string CustomerEmail { get; set; } = string.Empty;
  public string CustomerPhone { get; set; } = string.Empty;
  public string CustomerAddress { get; set; } = string.Empty;
  public string CustomerCity { get; set; } = string.Empty;
  public string CustomerState { get; set; } = string.Empty;
  public string CustomerZip { get; set; } = string.Empty;
  public string CustomerCountry { get; set; } = string.Empty;
  public string CustomerNotes { get; set; } = string.Empty;
  public string OrderStatus { get; set; } = string.Empty;
  public string OrderType { get; set; } = string.Empty;
  public string OrderSource { get; set; } = string.Empty;
  public ICollection<ItemDto> Items { get; set; } = new List<ItemDto>();
}
