# Action Logging System

## Overview

The Action Logging System provides comprehensive audit trail capabilities for your WMS application. It tracks all actions performed by admins, managers, and employees across all entities in the system.

## Key Features

### Enhanced Action Entity

The `Action` entity now includes:

- **User Information**: Links to the user who performed the action
- **Action Details**: Type, entity affected, timestamps
- **Change Tracking**: Old and new values for updates
- **Context Information**: IP address, user agent, success/failure status
- **Error Logging**: Captures error messages for failed operations

### Action Types

Standard action types include:
- `CREATE` - Creating new entities
- `UPDATE` - Modifying existing entities  
- `DELETE` - Removing entities
- `VIEW` - Accessing/viewing entities
- `LOGIN` - User authentication events
- `EXPORT` - Data export operations
- `IMPORT` - Data import operations

### Entity Types

The system can log actions for any entity type:
- `Warehouse`
- `Section`
- `Product`
- `Item`
- `Order`
- `User`
- And any future entities you add

## Implementation

### 1. Database Schema

The Action table includes these key fields:

```sql
- Id (Primary Key)
- UserId (Foreign Key to Users)
- ActionType (VARCHAR(100)) - e.g., "CREATE", "UPDATE", "DELETE"
- EntityType (VARCHAR(100)) - e.g., "Warehouse", "Product"
- EntityId (INT, nullable) - ID of affected entity
- EntityName (VARCHAR(200), nullable) - Name/identifier of entity
- Description (VARCHAR(500), nullable) - Human-readable description
- OldValues (TEXT, nullable) - JSON of old values (for updates)
- NewValues (TEXT, nullable) - JSON of new values (for creates/updates)
- IpAddress (VARCHAR(50), nullable)
- UserAgent (VARCHAR(500), nullable)
- Timestamp (DATETIME) - When action occurred
- IsSuccessful (BOOLEAN) - Whether action succeeded
- ErrorMessage (VARCHAR(1000), nullable) - Error details if failed
```

### 2. Service Layer

**IActionLogService** provides methods for:
- Logging actions with comprehensive details
- Querying action history by user, entity, or time period
- Paginated results for performance

**ActionLogService** implements the interface with:
- Automatic JSON serialization of old/new values
- Error handling that won't break main operations
- Efficient database queries with proper indexing

### 3. Controller Integration

Use the `ControllerExtensions` helper methods:

```csharp
// Log successful action
await this.LogActionAsync(_actionLogService, "CREATE", "Warehouse", 
    warehouse.Id, warehouse.Name, $"Created warehouse: {warehouse.Name}", 
    null, createdWarehouse);

// Log failed action
await this.LogActionAsync(_actionLogService, "CREATE", "Warehouse", 
    null, warehouseDto.Name, $"Failed to create warehouse: {warehouseDto.Name}", 
    null, warehouseDto, false, ex.Message);
```

### 4. API Endpoints

The `ActionController` provides endpoints for:
- `/api/actions` - Get all actions (Admin only)
- `/api/actions/user/{userId}` - Get actions by user (Admin/Manager)
- `/api/actions/my-actions` - Get current user's actions
- `/api/actions/entity/{entityType}` - Get actions by entity type (Admin/Manager)

All endpoints support filtering by date range, action type, and pagination.

## Security Considerations

### Role-Based Access
- **Admins**: Can view all action logs
- **Managers**: Can view logs for their users and entities
- **Employees**: Can only view their own action logs

### Data Protection
- Sensitive data in old/new values should be sanitized
- IP addresses and user agents are logged for security auditing
- Failed actions are logged to detect potential security threats

### Performance
- Database indexes on UserId, Timestamp, EntityType, and EntityId
- Paginated queries to prevent performance issues
- Async logging to avoid blocking main operations

## Usage Examples

### Basic Action Logging

```csharp
// In any controller action
await this.LogActionAsync(_actionLogService, "VIEW", "Product", 
    productId, product.Name, $"Viewed product: {product.Name}");
```

### Update with Change Tracking

```csharp
// Store old values before update
var oldValues = new { Name = product.Name, Price = product.Price };

// Perform update
product.Name = newName;
product.Price = newPrice;
await _repository.SaveChangesAsync();

// Log with old and new values
await this.LogActionAsync(_actionLogService, "UPDATE", "Product", 
    product.Id, product.Name, $"Updated product: {product.Name}", 
    oldValues, new { Name = product.Name, Price = product.Price });
```

### Error Logging

```csharp
try
{
    // Perform operation
    await _repository.DeleteProductAsync(id);
    
    // Log success
    await this.LogActionAsync(_actionLogService, "DELETE", "Product", 
        id, productName, $"Deleted product: {productName}");
}
catch (Exception ex)
{
    // Log failure
    await this.LogActionAsync(_actionLogService, "DELETE", "Product", 
        id, productName, $"Failed to delete product: {productName}", 
        null, null, false, ex.Message);
    throw;
}
```

## Migration

Run the following command to apply the database migration:

```bash
dotnet ef database update
```

This will create the Actions table with all necessary indexes and relationships.

## Next Steps

1. **Apply Migration**: Run `dotnet ef database update` to create the Actions table
2. **Update Controllers**: Integrate action logging into your existing controllers using the example patterns
3. **Configure Frontend**: Create admin interfaces to view and filter action logs
4. **Set Up Monitoring**: Consider setting up alerts for failed actions or suspicious activity patterns
5. **Data Retention**: Implement a strategy for archiving or cleaning up old action logs

## Benefits

- **Compliance**: Meet audit requirements for tracking all system changes
- **Security**: Detect unauthorized access attempts and suspicious activity
- **Debugging**: Trace issues back to specific user actions and changes
- **User Accountability**: Track who made what changes when
- **Performance Monitoring**: Identify frequently accessed entities and operations
