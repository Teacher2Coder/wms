using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/item")]
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
    return Ok(items);
  }

}
