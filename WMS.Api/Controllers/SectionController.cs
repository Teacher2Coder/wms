using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/section")]
public class SectionController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;

  public SectionController(IMapper mapper, IWarehouseRepository warehouseRepository)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
  }

  [HttpGet("{sectionId}")]
  public async Task<IActionResult> GetSection(int sectionId)
  {
    var section = await _warehouseRepository.GetSectionByIdAsync(sectionId);
    if (section == null)
    {
      return NotFound();
    }

    var sectionDto = _mapper.Map<SectionDto>(section);
    return Ok(sectionDto);
  }
}
