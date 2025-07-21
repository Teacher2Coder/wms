using System;
using WMS.Api.Entities;

namespace WMS.Api.Services;

public interface IWarehouseRepository
{
  Task<IEnumerable<Warehouse>> GetWarehousesAsync();
  Task<Warehouse?> GetWarehouseByIdAsync(int id);
  Task<Section?> GetSectionByIdAsync(int id);
  Task<Product?> GetProductByIdAsync(int id);
  Task<Item?> GetItemByIdAsync(int id);
  Task<IEnumerable<Section>> GetSectionsByWarehouseIdAsync(int warehouseId);
  Task<IEnumerable<Product>> GetProductsBySectionIdAsync(int sectionId);
  Task<IEnumerable<Item>> GetItemsByProductIdAsync(int productId);
  Task<IEnumerable<Item>> GetItemsBySectionIdAsync(int sectionId);
  Task<IEnumerable<Item>> GetItemsByWarehouseIdAsync(int warehouseId);
  Task<bool> SaveChangesAsync();
}
