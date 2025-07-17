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
      .ToListAsync();
  }
}
