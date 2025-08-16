using System;
using Microsoft.EntityFrameworkCore;
using WMS.Api.DbContexts;
using WMS.Api.Entities;

namespace WMS.Api.Services;

public class WarehouseRepository : IWarehouseRepository
{
  private readonly WarehouseContext _context;

  public WarehouseRepository(WarehouseContext context)
  {
    _context = context ?? throw new ArgumentNullException(nameof(context));
  }

  #region Get

  public async Task<IEnumerable<Warehouse>> GetWarehousesAsync()
  {
    return await _context.Warehouses
      .Include(w => w.Sections)
        .ThenInclude(s => s.Items)
      .ToListAsync();
  }

  public async Task<Warehouse?> GetWarehouseByIdAsync(int id)
  {
    return await _context.Warehouses
      .Include(w => w.Sections)
        .ThenInclude(s => s.Items)
      .FirstOrDefaultAsync(w => w.Id == id);
  }

  public async Task<Section?> GetSectionByIdAsync(int id)
  {
    return await _context.Sections
      .Include(s => s.Items)
      .FirstOrDefaultAsync(s => s.Id == id);
  }

  public async Task<IEnumerable<Product>> GetAllProductsAsync()
  {
    return await _context.Products
      .Include(p => p.Items)
      .ToListAsync();
  }

  public async Task<Product?> GetProductByIdAsync(int id)
  {
    return await _context.Products
      .Include(p => p.Items)
      .FirstOrDefaultAsync(p => p.Id == id);
  }

  public async Task<IEnumerable<Product>> GetProductsByNameAsync(string name)
  {
    return await _context.Products
      .Include(p => p.Items)
      .Where(p => p.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase))
      .ToListAsync();
  }

  public async Task<Item?> GetItemByIdAsync(int id)
  {
    return await _context.Items
      .FirstOrDefaultAsync(i => i.Id == id);
  }

  public async Task<IEnumerable<Item>> GetItemsBySerialNumberAsync(string serialNumber)
  {
    return await _context.Items
      .Where(i => i.SerialNumber.Contains(serialNumber, StringComparison.CurrentCultureIgnoreCase))
      .ToListAsync();
  }

  public async Task<IEnumerable<Order>> GetOrdersAsync()
  {
    return await _context.Orders
      .Include(o => o.Items)
      .ToListAsync();
  }
  
  public async Task<Order?> GetOrderByIdAsync(int id)
  {
    return await _context.Orders
      .Include(o => o.Items)
      .FirstOrDefaultAsync(o => o.Id == id);
  }

  public async Task<IEnumerable<Order>> GetOrdersByNumberAsync(string number)
  {
    return await _context.Orders
      .Where(o => o.OrderNumber.Contains(number, StringComparison.CurrentCultureIgnoreCase))
      .ToListAsync();
  }
  
  #endregion

  #region Create

  public async Task<bool> CreateWarehouseAsync(Warehouse warehouse)
  {
    await _context.Warehouses.AddAsync(warehouse);
    return await SaveChangesAsync();
  }

  public async Task<Section?> CreateSectionAsync(int warehouseId, Section section)
  {
    section.WarehouseId = warehouseId;
    await _context.Sections.AddAsync(section);
    var saved = await SaveChangesAsync();
    return saved ? section : null;
  }

  public async Task<bool> CreateProductAsync(Product product)
  {
    await _context.Products.AddAsync(product);
    return await SaveChangesAsync();
  }

  public async Task<bool> CreateItemAsync(Item item)
  {
    await _context.Items.AddAsync(item);
    return await SaveChangesAsync();
  }

  public async Task<bool> CreateOrderAsync(Order order)
  {
    await _context.Orders.AddAsync(order);
    return await SaveChangesAsync();
  }
  
  #endregion

  #region Delete

  public async Task<bool> DeleteWarehouseAsync(int id)
  {
    var warehouse = await _context.Warehouses.FindAsync(id);
    if (warehouse == null)
    {
      return false;
    }
    _context.Warehouses.Remove(warehouse);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteSectionAsync(int id)
  {
    var section = await _context.Sections.FindAsync(id);
    if (section == null)
    {
      return false;
    }
    _context.Sections.Remove(section);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteProductAsync(int id)
  {
    var product = await _context.Products.FindAsync(id);
    if (product == null)
    {
      return false;
    }
    _context.Products.Remove(product);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteItemAsync(int id)
  {
    var item = await _context.Items.FindAsync(id);
    if (item == null)
    {
      return false;
    }
    _context.Items.Remove(item);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteOrderAsync(int id)
  {
    var order = await _context.Orders.FindAsync(id);
    if (order == null)
    {
      return false;
    }
    _context.Orders.Remove(order);
    return await SaveChangesAsync();
  }

  #endregion

  #region Save

  public async Task<bool> SaveChangesAsync()
  {
    return await _context.SaveChangesAsync() >= 0;
  }

  #endregion
}
