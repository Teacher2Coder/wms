using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WMS.Api.Services;

namespace WMS.Api.Extensions;

public static class ControllerExtensions
{
    public static int GetCurrentUserId(this ControllerBase controller)
    {
        var userIdClaim = controller.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out int userId))
        {
            throw new UnauthorizedAccessException("Invalid user ID");
        }
        return userId;
    }

    public static string? GetCurrentUserRole(this ControllerBase controller)
    {
        return controller.User.FindFirst(ClaimTypes.Role)?.Value;
    }

    public static string? GetClientIpAddress(this ControllerBase controller)
    {
        // Check for forwarded IP first (for load balancers/proxies)
        var forwardedFor = controller.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        if (!string.IsNullOrEmpty(forwardedFor))
        {
            return forwardedFor.Split(',')[0].Trim();
        }

        // Check for real IP
        var realIp = controller.Request.Headers["X-Real-IP"].FirstOrDefault();
        if (!string.IsNullOrEmpty(realIp))
        {
            return realIp;
        }

        // Fall back to connection remote IP
        return controller.HttpContext.Connection.RemoteIpAddress?.ToString();
    }

    public static string? GetUserAgent(this ControllerBase controller)
    {
        return controller.Request.Headers["User-Agent"].FirstOrDefault();
    }

    public static async Task LogActionAsync(this ControllerBase controller, IActionLogService actionLogService, 
        string actionType, string entityType, int? entityId = null, string? entityName = null, 
        string? description = null, object? oldValues = null, object? newValues = null)
    {
        try
        {
            var userId = controller.GetCurrentUserId();
            var ipAddress = controller.GetClientIpAddress();
            var userAgent = controller.GetUserAgent();

            await actionLogService.LogActionAsync(userId, actionType, entityType, entityId, entityName, 
                description, oldValues, newValues, ipAddress, userAgent);
        }
        catch (Exception ex)
        {
            // Don't throw - logging should not break the main operation
            Console.WriteLine($"Failed to log action: {ex.Message}");
        }
    }

    public static async Task LogActionAsync(this ControllerBase controller, IActionLogService actionLogService, 
        string actionType, string entityType, int? entityId, string? entityName, string? description, 
        object? oldValues, object? newValues, bool isSuccessful, string? errorMessage = null)
    {
        try
        {
            var userId = controller.GetCurrentUserId();
            var ipAddress = controller.GetClientIpAddress();
            var userAgent = controller.GetUserAgent();

            await actionLogService.LogActionAsync(userId, actionType, entityType, entityId, entityName, 
                description, oldValues, newValues, ipAddress, userAgent, isSuccessful, errorMessage);
        }
        catch (Exception ex)
        {
            // Don't throw - logging should not break the main operation
            Console.WriteLine($"Failed to log action: {ex.Message}");
        }
    }
}
