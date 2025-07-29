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

  Task<bool> CreateWarehouseAsync(Warehouse warehouse);
  Task<bool> CreateSectionAsync(Section section);
  Task<bool> CreateProductAsync(Product product);
  Task<bool> CreateItemAsync(Item item);

  Task<bool> UpdateWarehouseAsync(Warehouse warehouse);
  Task<bool> UpdateSectionAsync(Section section);
  Task<bool> UpdateProductAsync(Product product);
  Task<bool> UpdateItemAsync(Item item);

  Task<bool> DeleteWarehouseAsync(Warehouse warehouse);
  Task<bool> DeleteSectionAsync(Section section);
  Task<bool> DeleteProductAsync(Product product);
  Task<bool> DeleteItemAsync(Item item);
  
  Task<bool> SaveChangesAsync();
}
