using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;
using WMS.Api.Extensions;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/warehouse")]
//[Authorize] // Require authentication for all warehouse operations
public class WarehouseController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;
  private readonly IActionLogService _actionLogService;

  public WarehouseController(IMapper mapper, IWarehouseRepository warehouseRepository, IActionLogService actionLogService)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
    _actionLogService = actionLogService ?? throw new ArgumentNullException(nameof(actionLogService));
  }

  [HttpGet]
  public async Task<IActionResult> GetWarehouses()
  {
    var warehouses = await _warehouseRepository.GetWarehousesAsync();
    if (warehouses == null || !warehouses.Any())
    {
      return NotFound();
    }

    var warehouseDtos = _mapper.Map<IEnumerable<WarehouseDto>>(warehouses);
    return Ok(warehouseDtos);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetWarehouse(int id)
  {
    var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(id);
    if (warehouse == null)
    {
      return NotFound();
    }

    var warehouseDto = _mapper.Map<WarehouseDto>(warehouse);
    return Ok(warehouseDto);
  }

  [HttpGet("search")]
  public async Task<IActionResult> SearchWarehouses(string name)
  {
    var warehouses = await _warehouseRepository.GetWarehousesByNameAsync(name);
    var warehouseDtos = _mapper.Map<IEnumerable<WarehouseDto>>(warehouses);
    return Ok(warehouseDtos);
  }

  [HttpPost]
  //[Authorize(Roles = "Admin")] // Only Admin can create warehouses
  public async Task<IActionResult> CreateWarehouse(WarehouseDto warehouseDto)
  {
    try
    {
      var warehouse = _mapper.Map<Warehouse>(warehouseDto);
      await _warehouseRepository.CreateWarehouseAsync(warehouse);

      var createdWarehouse = _mapper.Map<WarehouseDto>(warehouse);

      // Log successful creation
      await this.LogActionAsync(_actionLogService, "CREATE", "Warehouse", warehouse.Id, warehouse.Name,
        $"Created warehouse: {warehouse.Name}", null, createdWarehouse);

      return CreatedAtAction(
        nameof(GetWarehouse),
        new { id = warehouse.Id },
        createdWarehouse);
    }
    catch (Exception ex)
    {
      // Log failed creation
      await this.LogActionAsync(_actionLogService, "CREATE", "Warehouse", null, warehouseDto.Name,
        $"Failed to create warehouse: {warehouseDto.Name}", null, warehouseDto, false, ex.Message);
      throw;
    }
  }

  [HttpPut("{id}")]
  //[Authorize(Roles = "Admin")] // Only Admin can update warehouses
  public async Task<IActionResult> UpdateWarehouse(int id, WarehouseDto warehouseDto)
  {
    try
    {
      var warehouseToUpdate = await _warehouseRepository.GetWarehouseByIdAsync(id);

      if (warehouseToUpdate == null)
      {
        await this.LogActionAsync(_actionLogService, "UPDATE", "Warehouse", id, null,
          $"Attempted to update warehouse {id} - not found");
        return NotFound();
      }

      // Store old values for logging
      var oldValues = new
      {
        Name = warehouseToUpdate.Name,
        Location = warehouseToUpdate.Location,
        Description = warehouseToUpdate.Description
      };

      _mapper.Map(warehouseDto, warehouseToUpdate);
      await _warehouseRepository.SaveChangesAsync();

      // Log successful update
      await this.LogActionAsync(_actionLogService, "UPDATE", "Warehouse", id, warehouseToUpdate.Name,
        $"Updated warehouse: {warehouseToUpdate.Name}", oldValues, warehouseDto);

      return Ok(warehouseDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "UPDATE", "Warehouse", id, warehouseDto.Name,
        $"Failed to update warehouse {id}", null, warehouseDto, false, ex.Message);
      throw;
    }
  }

  [HttpDelete("{id}")]
  //[Authorize(Roles = "Admin")] // Only Admin can delete warehouses
  public async Task<IActionResult> DeleteWarehouse(int id)
  {
    try
    {
      var warehouseToDelete = await _warehouseRepository.GetWarehouseByIdAsync(id);
      if (warehouseToDelete == null)
      {
        await this.LogActionAsync(_actionLogService, "DELETE", "Warehouse", id, null,
          $"Attempted to delete warehouse {id} - not found");
        return NotFound();
      }

      // Store values before deletion for logging
      var deletedValues = new
      {
        Name = warehouseToDelete.Name,
        Location = warehouseToDelete.Location,
        Description = warehouseToDelete.Description
      };

      await _warehouseRepository.DeleteWarehouseAsync(id);

      // Log successful deletion
      await this.LogActionAsync(_actionLogService, "DELETE", "Warehouse", id, warehouseToDelete.Name,
        $"Deleted warehouse: {warehouseToDelete.Name}", deletedValues, null);

      return NoContent();
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "DELETE", "Warehouse", id, null,
        $"Failed to delete warehouse {id}", null, null, false, ex.Message);
      throw;
    }
  }
}
