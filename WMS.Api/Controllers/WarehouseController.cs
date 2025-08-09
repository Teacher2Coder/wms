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
    
    return CreatedAtAction(
      nameof(GetWarehouse), 
      new { id = warehouse.Id }, 
      warehouseDto);
  }
}
