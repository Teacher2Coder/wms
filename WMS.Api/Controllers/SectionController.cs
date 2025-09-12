using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/warehouse/{warehouseId}/section")]
[Authorize] // Require authentication for all section operations
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
  public async Task<IActionResult> GetSection(int warehouseId, int sectionId)
  {
    var section = await _warehouseRepository.GetSectionByIdAsync(sectionId);
    if (section == null)
    {
      return NotFound();
    }

    var sectionDto = _mapper.Map<SectionDto>(section);
    return Ok(sectionDto);
  }

  [HttpPost]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can create sections
  public async Task<IActionResult> CreateSection(int warehouseId, SectionDto sectionDto)
  {
    // Verify warehouse exists
    var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
    if (warehouse == null)
    {
      return NotFound("Warehouse not found");
    }

    var section = _mapper.Map<Section>(sectionDto);
    var createdSection = await _warehouseRepository.CreateSectionAsync(warehouseId, section);
    
    if (createdSection == null)
    {
      return BadRequest("Failed to create section");
    }

    var createdSectionDto = _mapper.Map<SectionDto>(createdSection);
    
    return CreatedAtAction(
      nameof(GetSection), 
      new { warehouseId = warehouseId, sectionId = createdSection.Id }, 
      createdSectionDto);
  }

  [HttpPut("{sectionId}")]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can update sections
  public async Task<IActionResult> UpdateSection(int warehouseId, int sectionId, SectionDto sectionDto)
  {
    var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
    if (warehouse == null)
    {
      return NotFound("Warehouse not found");
    }

    var sectionToUpdate = await _warehouseRepository.GetSectionByIdAsync(sectionId);
    if (sectionToUpdate == null)
    {
      return NotFound("Section not found");
    }

    // Only update the basic properties, not navigation properties
    sectionToUpdate.Name = sectionDto.Name;
    sectionToUpdate.Description = sectionDto.Description;
    
    await _warehouseRepository.SaveChangesAsync();

    // Return the updated section mapped to DTO
    var updatedSectionDto = _mapper.Map<SectionDto>(sectionToUpdate);
    return Ok(updatedSectionDto);
  }

  [HttpDelete("{sectionId}")]
  [Authorize(Roles = "Admin")] // Only Admin can delete sections
  public async Task<IActionResult> DeleteSection(int warehouseId, int sectionId)
  {
    var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
    if (warehouse == null)
    {
      return NotFound("Warehouse not found");
    }

    var sectionToDelete = await _warehouseRepository.GetSectionByIdAsync(sectionId);
    if (sectionToDelete == null)
    {
      return NotFound();
    }

    await _warehouseRepository.DeleteSectionAsync(sectionId);
    return Ok(sectionToDelete);
  }
}
