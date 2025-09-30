using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/item")]
[Authorize] // Require authentication for all item operations
public class ItemController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;

  public ItemController(IMapper mapper, IWarehouseRepository warehouseRepository)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
  }

  [HttpGet("{itemId}")]
  public async Task<IActionResult> GetItem(int itemId)
  {
    var item = await _warehouseRepository.GetItemByIdAsync(itemId);
    if (item == null)
    {
      return NotFound();
    }

    var itemDto = _mapper.Map<ItemDto>(item);
    return Ok(itemDto);
  }

  [HttpGet("search")]
  public async Task<IActionResult> SearchItems(string serialNumber)
  {
    var items = await _warehouseRepository.GetItemsBySerialNumberAsync(serialNumber);
    var itemDtos = _mapper.Map<IEnumerable<ItemDto>>(items);
    return Ok(itemDtos);
  }

  [HttpPost("checkin")]
  public async Task<IActionResult> CheckInItem(ItemCheckinDto itemCheckinDto)
  {
    try
    {
      // Validate required fields
      if (string.IsNullOrWhiteSpace(itemCheckinDto.Sku) || 
          string.IsNullOrWhiteSpace(itemCheckinDto.SerialNumber))
      {
        return BadRequest("SKU and Serial Number are required.");
      }

      // Check if serial number is unique
      var existingItems = await _warehouseRepository.GetItemsBySerialNumberAsync(itemCheckinDto.SerialNumber);
      if (existingItems.Any(item => item.SerialNumber != null && item.SerialNumber.ToLower() == itemCheckinDto.SerialNumber.ToLower()))
      {
        return BadRequest($"An item with serial number '{itemCheckinDto.SerialNumber}' already exists.");
      }

      // Validate warehouse exists
      var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(itemCheckinDto.Warehouse);
      if (warehouse == null)
      {
        return BadRequest($"Warehouse with ID {itemCheckinDto.Warehouse} not found.");
      }

      // Validate section exists and belongs to the warehouse
      var section = await _warehouseRepository.GetSectionByIdAsync(itemCheckinDto.Section);
      if (section == null)
      {
        return BadRequest($"Section with ID {itemCheckinDto.Section} not found.");
      }

      if (section.WarehouseId != itemCheckinDto.Warehouse)
      {
        return BadRequest("The selected section does not belong to the selected warehouse.");
      }

      // Get or validate product by SKU
      var product = await _warehouseRepository.GetProductBySkuAsync(itemCheckinDto.Sku);
      if (product == null)
      {
        return BadRequest($"Product with SKU '{itemCheckinDto.Sku}' not found.");
      }

      // Create new item
      var newItem = new Item
      {
        SerialNumber = itemCheckinDto.SerialNumber,
        ProductId = product.Id,
        SectionId = itemCheckinDto.Section,
        Status = ItemStatus.Available
      };

      // Save the item
      var createdItem = await _warehouseRepository.CreateItemAsync(newItem);

      // Map to DTO for response
      var itemDto = _mapper.Map<ItemDto>(createdItem);

      return CreatedAtAction(nameof(GetItem), new { itemId = createdItem.Id }, itemDto);
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"An error occurred while checking in the item: {ex.Message}");
    }
  }

}
