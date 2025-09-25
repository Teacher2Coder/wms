using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/order")]
[Authorize] // Require authentication for all order operations
public class OrderController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;

  public OrderController(IMapper mapper, IWarehouseRepository warehouseRepository)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
  }

  [HttpGet]
  public async Task<IActionResult> GetOrders()
  {
    var orders = await _warehouseRepository.GetOrdersAsync();
    var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
    return Ok(orderDtos);
  }

  [HttpGet("{orderId}")]
  public async Task<IActionResult> GetOrder(int orderId)
  {
    var order = await _warehouseRepository.GetOrderByIdAsync(orderId);
    if (order == null)
    {
      return NotFound();
    }
    var orderDto = _mapper.Map<OrderDto>(order);
    return Ok(orderDto);
  }

  [HttpGet("search")]
  public async Task<IActionResult> SearchOrders(string number)
  {
    var orders = await _warehouseRepository.GetOrdersByNumberAsync(number);
    var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
    return Ok(orderDtos);
  }

  [HttpPost]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can create orders
  public async Task<IActionResult> CreateOrder(OrderDto orderDto)
  {
    var order = _mapper.Map<Order>(orderDto);
    await _warehouseRepository.CreateOrderAsync(order);
    var createdOrderDto = _mapper.Map<OrderDto>(order);
    return Ok(createdOrderDto);
  }

  [HttpPut("{orderId}")]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can update orders
  public async Task<IActionResult> UpdateOrder(int orderId, OrderDto orderDto)
  {
    var order = await _warehouseRepository.GetOrderByIdAsync(orderId);
    if (order == null)
    {
      return NotFound();
    }

    _mapper.Map(orderDto, order);
    await _warehouseRepository.SaveChangesAsync();
    var updatedOrderDto = _mapper.Map<OrderDto>(order);
    return Ok(updatedOrderDto);
  }

  [HttpDelete("{orderId}")]
  [Authorize(Roles = "Admin")] // Only Admin can delete orders
  public async Task<IActionResult> DeleteOrder(int orderId)
  {
    await _warehouseRepository.DeleteOrderAsync(orderId);
    await _warehouseRepository.SaveChangesAsync();
    return Ok();
  }
}