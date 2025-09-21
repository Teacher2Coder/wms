using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using WMS.Api.DbContexts;

namespace WMS.Api.Services;

public class ActionLogService : IActionLogService
{
    private readonly WarehouseContext _context;

    public ActionLogService(WarehouseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task LogActionAsync(int userId, string actionType, string entityType, int? entityId = null, 
        string? entityName = null, string? description = null, object? oldValues = null, 
        object? newValues = null, string? ipAddress = null, string? userAgent = null)
    {
        await LogActionAsync(userId, actionType, entityType, entityId, entityName, description, 
            oldValues, newValues, ipAddress, userAgent, true, null);
    }

    public async Task LogActionAsync(int userId, string actionType, string entityType, int? entityId, 
        string? entityName, string? description, object? oldValues, object? newValues, 
        string? ipAddress, string? userAgent, bool isSuccessful, string? errorMessage = null)
    {
        try
        {
            var action = new Entities.Action
            {
                UserId = userId,
                ActionType = actionType,
                EntityType = entityType,
                EntityId = entityId,
                EntityName = entityName,
                Description = description,
                OldValues = oldValues != null ? JsonSerializer.Serialize(oldValues) : null,
                NewValues = newValues != null ? JsonSerializer.Serialize(newValues) : null,
                IpAddress = ipAddress,
                UserAgent = userAgent,
                IsSuccessful = isSuccessful,
                ErrorMessage = errorMessage,
                Timestamp = DateTime.UtcNow
            };

            _context.Actions.Add(action);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Log the error but don't throw - we don't want action logging to break the main operation
            // You might want to use a proper logging framework here
            Console.WriteLine($"Failed to log action: {ex.Message}");
        }
    }

    public async Task<IEnumerable<Entities.Action>> GetUserActionsAsync(int userId, int pageNumber = 1, int pageSize = 50)
    {
        return await _context.Actions
            .Include(a => a.User)
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.Timestamp)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Entities.Action>> GetEntityActionsAsync(string entityType, int? entityId = null, 
        int pageNumber = 1, int pageSize = 50)
    {
        var query = _context.Actions
            .Include(a => a.User)
            .Where(a => a.EntityType == entityType);

        if (entityId.HasValue)
        {
            query = query.Where(a => a.EntityId == entityId.Value);
        }

        return await query
            .OrderByDescending(a => a.Timestamp)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<Entities.Action>> GetActionsAsync(DateTime? fromDate = null, DateTime? toDate = null, 
        string? actionType = null, string? entityType = null, int pageNumber = 1, int pageSize = 50)
    {
        var query = _context.Actions.Include(a => a.User).AsQueryable();

        if (fromDate.HasValue)
            query = query.Where(a => a.Timestamp >= fromDate.Value);

        if (toDate.HasValue)
            query = query.Where(a => a.Timestamp <= toDate.Value);

        if (!string.IsNullOrEmpty(actionType))
            query = query.Where(a => a.ActionType == actionType);

        if (!string.IsNullOrEmpty(entityType))
            query = query.Where(a => a.EntityType == entityType);

        return await query
            .OrderByDescending(a => a.Timestamp)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }
}
