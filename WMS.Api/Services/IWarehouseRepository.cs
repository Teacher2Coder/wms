using System;
using WMS.Api.Entities;

namespace WMS.Api.Services;

public interface IWarehouseRepository
{
  Task<IEnumerable<Warehouse>> GetWarehousesAsync();
  Task<Warehouse?> GetWarehouseByIdAsync(int id);
  Task<Section?> GetSectionByIdAsync(int id);
  Task<IEnumerable<Product>> GetAllProductsAsync();
  Task<Product?> GetProductByIdAsync(int id);
  Task<IEnumerable<Product>> GetProductsByNameAsync(string name);
  Task<Item?> GetItemByIdAsync(int id);
  Task<IEnumerable<Item>> GetItemsBySerialNumberAsync(string serialNumber);
  
  Task<bool> CreateWarehouseAsync(Warehouse warehouse);
  Task<Section?> CreateSectionAsync(int warehouseId, Section section);
  Task<bool> CreateProductAsync(Product product);
  Task<bool> CreateItemAsync(Item item);

  Task<bool> DeleteWarehouseAsync(int id);
  Task<bool> DeleteSectionAsync(int id);
  Task<bool> DeleteProductAsync(int id);
  Task<bool> DeleteItemAsync(int id);
  
  Task<bool> SaveChangesAsync();
}
