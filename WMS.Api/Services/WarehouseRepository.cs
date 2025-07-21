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

  public async Task<IEnumerable<Warehouse>> GetWarehousesAsync()
  {
    return await _context.Warehouses
      .Include(w => w.Sections)
        .ThenInclude(s => s.Products)
          .ThenInclude(p => p.Items)
      .ToListAsync();
  }

  public async Task<Warehouse?> GetWarehouseByIdAsync(int id)
  {
    return await _context.Warehouses
      .Include(w => w.Sections)
        .ThenInclude(s => s.Products)
          .ThenInclude(p => p.Items)
      .FirstOrDefaultAsync(w => w.Id == id);
  }

  public async Task<Section?> GetSectionByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public async Task<Product?> GetProductByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public async Task<Item?> GetItemByIdAsync(int id)
  {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<Section>> GetSectionsByWarehouseIdAsync(int warehouseId)
  {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<Product>> GetProductsBySectionIdAsync(int sectionId)
  {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<Item>> GetItemsByProductIdAsync(int productId)
  {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<Item>> GetItemsBySectionIdAsync(int sectionId)
  {
    throw new NotImplementedException();
  }

  public async Task<IEnumerable<Item>> GetItemsByWarehouseIdAsync(int warehouseId)
  {
    throw new NotImplementedException();
  }

  public async Task<bool> SaveChangesAsync()
  {
    return await _context.SaveChangesAsync() >= 0;
  }
}
