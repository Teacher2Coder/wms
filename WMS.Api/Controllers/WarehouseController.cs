using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;

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
}
