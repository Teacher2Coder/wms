using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;
using WMS.Api.Extensions;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/warehouse/{warehouseId}/section")]
[Authorize] // Require authentication for all section operations
public class SectionController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;
  private readonly IActionLogService _actionLogService;

  public SectionController(IMapper mapper, IWarehouseRepository warehouseRepository, IActionLogService actionLogService)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
    _actionLogService = actionLogService ?? throw new ArgumentNullException(nameof(actionLogService));
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
    try
    {
      // Verify warehouse exists
      var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
      if (warehouse == null)
      {
        await this.LogActionAsync(_actionLogService, "CREATE", "Section", null, sectionDto.Name,
          $"Failed to create section: {sectionDto.Name}", null, sectionDto, false, "Warehouse not found");

        return NotFound("Warehouse not found");
      }

      var section = _mapper.Map<Section>(sectionDto);
      var createdSection = await _warehouseRepository.CreateSectionAsync(warehouseId, section);

      if (createdSection == null)
      {
        await this.LogActionAsync(_actionLogService, "CREATE", "Section", null, sectionDto.Name,
          $"Failed to create section: {sectionDto.Name}", null, sectionDto, false, "Failed to create section");

        return BadRequest("Failed to create section");
      }

      var createdSectionDto = _mapper.Map<SectionDto>(createdSection);

      await this.LogActionAsync(_actionLogService, "CREATE", "Section", createdSection.Id, createdSectionDto.Name,
        $"Created section: {createdSectionDto.Name}", null, createdSectionDto);

      return CreatedAtAction(
        nameof(GetSection),
        new { warehouseId = warehouseId, sectionId = createdSection.Id },
        createdSectionDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "CREATE", "Section", null, sectionDto.Name,
        $"Failed to create section: {sectionDto.Name}", null, sectionDto, false, ex.Message);
      throw;
    }
  }

  [HttpPut("{sectionId}")]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can update sections
  public async Task<IActionResult> UpdateSection(int warehouseId, int sectionId, SectionDto sectionDto)
  {
    try
    {
      var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
      if (warehouse == null)
      {
        await this.LogActionAsync(_actionLogService, "UPDATE", "Section", sectionId, sectionDto.Name,
          $"Failed to update section: {sectionDto.Name}", null, sectionDto, false, "Warehouse not found");

        return NotFound("Warehouse not found");
      }

      var sectionToUpdate = await _warehouseRepository.GetSectionByIdAsync(sectionId);
      if (sectionToUpdate == null)
      {
        await this.LogActionAsync(_actionLogService, "UPDATE", "Section", sectionId, sectionDto.Name,
          $"Failed to update section: {sectionDto.Name}", null, sectionDto, false, "Section not found");

        return NotFound("Section not found");
      }

      // Only update the basic properties, not navigation properties
      sectionToUpdate.Name = sectionDto.Name;
      sectionToUpdate.Description = sectionDto.Description;

      await _warehouseRepository.SaveChangesAsync();

      // Return the updated section mapped to DTO
      var updatedSectionDto = _mapper.Map<SectionDto>(sectionToUpdate);

      await this.LogActionAsync(_actionLogService, "UPDATE", "Section", sectionId, sectionDto.Name,
        $"Updated section: {sectionDto.Name}", null, sectionDto);

      return Ok(updatedSectionDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "UPDATE", "Section", sectionId, sectionDto.Name,
        $"Failed to update section: {sectionDto.Name}", null, sectionDto, false, ex.Message);
      throw;
    }
  }

  [HttpDelete("{sectionId}")]
  [Authorize(Roles = "Admin")] // Only Admin can delete sections
  public async Task<IActionResult> DeleteSection(int warehouseId, int sectionId)
  {
    try
    {
      var warehouse = await _warehouseRepository.GetWarehouseByIdAsync(warehouseId);
      if (warehouse == null)
      {
        await this.LogActionAsync(_actionLogService, "DELETE", "Section", sectionId, null,
          $"Failed to delete section: {sectionId}", null, null, false, "Warehouse not found");

        return NotFound("Warehouse not found");
      }

      var sectionToDelete = await _warehouseRepository.GetSectionByIdAsync(sectionId);
      if (sectionToDelete == null)
      {
        await this.LogActionAsync(_actionLogService, "DELETE", "Section", sectionId, null,
          $"Failed to delete section: {sectionId}", null, null, false, "Section not found");

        return NotFound();
      }

      await _warehouseRepository.DeleteSectionAsync(sectionId);

      var deletedSectionDto = _mapper.Map<SectionDto>(sectionToDelete);
      await this.LogActionAsync(_actionLogService, "DELETE", "Section", sectionId, sectionToDelete.Name,
        $"Deleted section: {sectionToDelete.Name}", null, deletedSectionDto);

      return Ok(deletedSectionDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "DELETE", "Section", sectionId, null,
        $"Failed to delete section: {sectionId}", null, null, false, ex.Message);
      throw;
    }
  }
}
