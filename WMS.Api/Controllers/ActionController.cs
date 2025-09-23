using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using System.Security.Claims;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/actions")]
[Authorize] // Require authentication for all action log operations
public class ActionController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IActionLogService _actionLogService;

    public ActionController(IMapper mapper, IActionLogService actionLogService)
    {
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _actionLogService = actionLogService ?? throw new ArgumentNullException(nameof(actionLogService));
    }

    [HttpGet]
    [Authorize(Roles = "Admin,Manager")] // Only admins can view all actions
    public async Task<IActionResult> GetActions(
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] string? actionType = null,
        [FromQuery] string? entityType = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 50)
    {
        if (pageSize > 100) pageSize = 100; // Limit page size

        var actions = await _actionLogService.GetActionsAsync(fromDate, toDate, actionType, entityType, pageNumber, pageSize);
        var actionDtos = _mapper.Map<IEnumerable<ActionDto>>(actions);
        
        return Ok(actionDtos);
    }

    [HttpGet("{actionId}")]
    public async Task<IActionResult> GetAction(int actionId)
    {
        var action = await _actionLogService.GetActionAsync(actionId);
        var actionDto = _mapper.Map<ActionDto>(action);
        return Ok(actionDto);
    }

    [HttpGet("user/{userId}")]
    [Authorize(Roles = "Admin,Manager")] // Admins and managers can view user actions
    public async Task<IActionResult> GetUserActions(int userId, 
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 50)
    {
        if (pageSize > 100) pageSize = 100; // Limit page size

        var actions = await _actionLogService.GetUserActionsAsync(userId, pageNumber, pageSize);
        var actionDtos = _mapper.Map<IEnumerable<ActionDto>>(actions);
        
        return Ok(actionDtos);
    }

    [HttpGet("my-actions")]
    public async Task<IActionResult> GetMyActions(
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 50)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out int userId))
        {
            return BadRequest("Invalid user ID");
        }

        if (pageSize > 100) pageSize = 100; // Limit page size

        var actions = await _actionLogService.GetUserActionsAsync(userId, pageNumber, pageSize);
        var actionDtos = _mapper.Map<IEnumerable<ActionDto>>(actions);
        
        return Ok(actionDtos);
    }

    [HttpGet("entity/{entityType}")]
    [Authorize(Roles = "Admin,Manager")] // Admins and managers can view entity actions
    public async Task<IActionResult> GetEntityActions(string entityType,
        [FromQuery] int? entityId = null,
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 50)
    {
        if (pageSize > 100) pageSize = 100; // Limit page size

        var actions = await _actionLogService.GetEntityActionsAsync(entityType, entityId, pageNumber, pageSize);
        var actionDtos = _mapper.Map<IEnumerable<ActionDto>>(actions);
        
        return Ok(actionDtos);
    }
}
