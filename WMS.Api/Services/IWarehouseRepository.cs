using System;
using WMS.Api.Entities;

namespace WMS.Api.Services;

public interface IWarehouseRepository
{
  Task<IEnumerable<Warehouse>> GetWarehousesAsync();
  Task<Warehouse?> GetWarehouseByIdAsync(int id);
  Task<IEnumerable<Warehouse>> GetWarehousesByNameAsync(string name);
  
  Task<Section?> GetSectionByIdAsync(int id);
  Task<IEnumerable<Product>> GetAllProductsAsync();
  Task<Product?> GetProductByIdAsync(int id);
  Task<IEnumerable<Product>> GetProductsByNameAsync(string name);
  Task<IEnumerable<Product>> GetProductsBySkuAsync(string sku);
  Task<Item?> GetItemByIdAsync(int id);
  Task<IEnumerable<Item>> GetItemsBySerialNumberAsync(string serialNumber);
  Task<IEnumerable<Order>> GetOrdersAsync();
  Task<Order?> GetOrderByIdAsync(int id);
  Task<IEnumerable<Order>> GetOrdersByNumberAsync(string number);

  Task<bool> CreateWarehouseAsync(Warehouse warehouse);
  Task<Section?> CreateSectionAsync(int warehouseId, Section section);
  Task<bool> CreateProductAsync(Product product);
  Task<bool> CreateItemAsync(Item item);
  Task<bool> CreateOrderAsync(Order order);

  Task<bool> DeleteWarehouseAsync(int id);
  Task<bool> DeleteSectionAsync(int id);
  Task<bool> DeleteProductAsync(int id);
  Task<bool> DeleteItemAsync(int id);
  Task<bool> DeleteOrderAsync(int id);

  Task<bool> SaveChangesAsync();
}
