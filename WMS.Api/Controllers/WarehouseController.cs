using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/warehouse")]
public class WarehouseController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;

  public WarehouseController(IMapper mapper, IWarehouseRepository warehouseRepository)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
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

  [HttpPost]
  public async Task<IActionResult> CreateWarehouse(WarehouseDto warehouseDto)
  {
    var warehouse = _mapper.Map<Warehouse>(warehouseDto);
    await _warehouseRepository.CreateWarehouseAsync(warehouse);

    var createdWarehouse = _mapper.Map<WarehouseDto>(warehouse);
    
    return CreatedAtAction(
      nameof(GetWarehouse), 
      new { id = warehouse.Id }, 
      createdWarehouse);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateWarehouse(int id, WarehouseDto warehouseDto)
  {
    var warehouseToUpdate = await _warehouseRepository.GetWarehouseByIdAsync(id);

    if (warehouseToUpdate == null)
    {
      return NotFound();
    }

    _mapper.Map(warehouseDto, warehouseToUpdate);
    await _warehouseRepository.SaveChangesAsync();

    return Ok(warehouseDto);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteWarehouse(int id)
  {
    var warehouseToDelete = await _warehouseRepository.GetWarehouseByIdAsync(id);
    if (warehouseToDelete == null)
    {
      return NotFound();
    }

    await _warehouseRepository.DeleteWarehouseAsync(id);
    return Ok(warehouseToDelete);
  }
}
