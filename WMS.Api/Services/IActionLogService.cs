using WMS.Api.Entities;

namespace WMS.Api.Services;

public interface IActionLogService
{
    Task LogActionAsync(int userId, string actionType, string entityType, int? entityId = null, 
        string? entityName = null, string? description = null, object? oldValues = null, 
        object? newValues = null, string? ipAddress = null, string? userAgent = null);
    
    Task LogActionAsync(int userId, string actionType, string entityType, int? entityId, 
        string? entityName, string? description, object? oldValues, object? newValues, 
        string? ipAddress, string? userAgent, bool isSuccessful, string? errorMessage = null);
    
    Task<IEnumerable<Entities.Action>> GetUserActionsAsync(int userId, int pageNumber = 1, int pageSize = 50);
    
    Task<IEnumerable<Entities.Action>> GetEntityActionsAsync(string entityType, int? entityId = null, 
        int pageNumber = 1, int pageSize = 50);
    
    Task<IEnumerable<Entities.Action>> GetActionsAsync(DateTime? fromDate = null, DateTime? toDate = null, 
        string? actionType = null, string? entityType = null, int pageNumber = 1, int pageSize = 50);

    Task<Entities.Action> GetActionAsync(int actionId);
}
