using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Api.Entities;

public class Order
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int Id { get; set; }

  public string OrderNumber { get; set; }

  public DateTime OrderDate { get; set; }

  public string CustomerName { get; set; }
  
  public string CustomerEmail { get; set; }

  public string CustomerPhone { get; set; }

  public string CustomerAddress { get; set; }

  public string CustomerCity { get; set; }
  
  public string CustomerState { get; set; }

  public string CustomerZip { get; set; }

  public string CustomerCountry { get; set; }

  public string CustomerNotes { get; set; }
  
  public string OrderStatus { get; set; }

  public string OrderType { get; set; }

  public string OrderSource { get; set; }

  public ICollection<Item>? Items { get; set; }

  public Order(string orderNumber, string customerName, string customerEmail, string customerPhone, string customerAddress, string customerCity, string customerState, string customerZip, string customerCountry, string customerNotes)
  {
    OrderNumber = orderNumber;
    OrderDate = DateTime.UtcNow;
    CustomerName = customerName;
    CustomerEmail = customerEmail;
    CustomerPhone = customerPhone;
    CustomerAddress = customerAddress;
    CustomerCity = customerCity;
    CustomerState = customerState;
    CustomerZip = customerZip;
    CustomerCountry = customerCountry;
    CustomerNotes = customerNotes;
    OrderStatus = "Pending";
    OrderType = "Sale";
    OrderSource = "Online";
  }
}