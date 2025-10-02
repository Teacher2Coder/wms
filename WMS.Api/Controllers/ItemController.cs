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

      // Check if serial number is unique for this specific product
      var existingItem = await _warehouseRepository.GetItemBySerialNumberAndProductIdAsync(itemCheckinDto.SerialNumber, product.Id);
      if (existingItem != null)
      {
        return BadRequest($"An item with serial number '{itemCheckinDto.SerialNumber}' already exists for product '{product.Name}' (SKU: {product.Sku}).");
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

  [HttpPut("{itemId}")]
  public async Task<IActionResult> UpdateItem(int itemId, ItemUpdateDto itemUpdateDto)
  {
    try
    {
      // Validate required fields
      if (string.IsNullOrWhiteSpace(itemUpdateDto.SerialNumber))
      {
        return BadRequest("Serial Number is required.");
      }

      // Get the existing item
      var existingItem = await _warehouseRepository.GetItemByIdAsync(itemId);
      if (existingItem == null)
      {
        return NotFound($"Item with ID {itemId} not found.");
      }

      // Validate warehouse exists
      var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(itemUpdateDto.Warehouse);
      if (warehouse == null)
      {
        return BadRequest($"Warehouse with ID {itemUpdateDto.Warehouse} not found.");
      }

      // Validate section exists and belongs to the warehouse
      var section = await _warehouseRepository.GetSectionByIdAsync(itemUpdateDto.Section);
      if (section == null)
      {
        return BadRequest($"Section with ID {itemUpdateDto.Section} not found.");
      }

      if (section.WarehouseId != itemUpdateDto.Warehouse)
      {
        return BadRequest("The selected section does not belong to the selected warehouse.");
      }

      // Check if serial number is unique for this product (excluding current item)
      var duplicateItem = await _warehouseRepository.GetItemBySerialNumberAndProductIdAsync(itemUpdateDto.SerialNumber, existingItem.ProductId);
      if (duplicateItem != null && duplicateItem.Id != itemId)
      {
        return BadRequest($"An item with serial number '{itemUpdateDto.SerialNumber}' already exists for this product.");
      }

      // Update the item properties
      existingItem.SerialNumber = itemUpdateDto.SerialNumber;
      existingItem.Status = itemUpdateDto.Status;
      existingItem.SectionId = itemUpdateDto.Section;

      // Save the changes
      var updateResult = await _warehouseRepository.UpdateItemAsync(existingItem);
      if (!updateResult)
      {
        return StatusCode(500, "Failed to update the item.");
      }

      // Return the updated item
      var updatedItemDto = _mapper.Map<ItemDto>(existingItem);
      return Ok(updatedItemDto);
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"An error occurred while updating the item: {ex.Message}");
    }
  }

}
