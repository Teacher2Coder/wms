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
    return await _context.Sections
      .Include(s => s.Products)
        .ThenInclude(p => p.Items)
      .FirstOrDefaultAsync(s => s.Id == id);
  }

  public async Task<Product?> GetProductByIdAsync(int id)
  {
    return await _context.Products
      .Include(p => p.Items)
      .FirstOrDefaultAsync(p => p.Id == id);
  }

  public async Task<Item?> GetItemByIdAsync(int id)
  {
    return await _context.Items
      .FirstOrDefaultAsync(i => i.Id == id);
  }
  
  #endregion

  #region Create

  public async Task<bool> CreateWarehouseAsync(Warehouse warehouse)
  {
    await _context.Warehouses.AddAsync(warehouse);
    return await SaveChangesAsync();
  }

  public async Task<bool> CreateSectionAsync(Section section)
  {
    await _context.Sections.AddAsync(section);
    return await SaveChangesAsync();
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
  
  #endregion

  #region Update

  public async Task<bool> UpdateWarehouseAsync(Warehouse warehouse)
  {
    _context.Warehouses.Update(warehouse);
    return await SaveChangesAsync();
  }

  public async Task<bool> UpdateSectionAsync(Section section)
  {
    _context.Sections.Update(section);
    return await SaveChangesAsync();
  }

  public async Task<bool> UpdateProductAsync(Product product)
  {
    _context.Products.Update(product);
    return await SaveChangesAsync();
  }

  public async Task<bool> UpdateItemAsync(Item item)
  {
    _context.Items.Update(item);
    return await SaveChangesAsync();
  }
  
  #endregion

  #region Delete

  public async Task<bool> DeleteWarehouseAsync(Warehouse warehouse)
  {
    _context.Warehouses.Remove(warehouse);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteSectionAsync(Section section)
  {
    _context.Sections.Remove(section);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteProductAsync(Product product)
  {
    _context.Products.Remove(product);
    return await SaveChangesAsync();
  }

  public async Task<bool> DeleteItemAsync(Item item)
  {
    _context.Items.Remove(item);
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
