using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/product")]
[Authorize] // Require authentication for all product operations
public class ProductController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;

  public ProductController(IMapper mapper, IWarehouseRepository warehouseRepository)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
  }

  [HttpGet]
  public async Task<IActionResult> GetAllProducts()
  {
    var products = await _warehouseRepository.GetAllProductsAsync();
    return Ok(products);
  }

  [HttpGet("{productId}")]
  public async Task<IActionResult> GetProduct(int productId)
  {
    var product = await _warehouseRepository.GetProductByIdAsync(productId);
    if (product == null)
    {
      return NotFound();
    }

    var productDto = _mapper.Map<ProductDto>(product);
    return Ok(productDto);
  }

  [HttpGet("search")]
  public async Task<IActionResult> SearchProducts(string name)
  {
    var products = await _warehouseRepository.GetProductsByNameAsync(name);
    return Ok(products);
  }

  [HttpPost]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can create products
  public async Task<IActionResult> CreateProduct(ProductDto productDto)
  {
    var product = _mapper.Map<Product>(productDto);
    await _warehouseRepository.CreateProductAsync(product);
    return Ok(product);
  }

  [HttpPut("{productId}")]
  [Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can update products
  public async Task<IActionResult> UpdateProduct(int productId, ProductDto productDto)
  {
    var product = await _warehouseRepository.GetProductByIdAsync(productId);
    if (product == null)
    {
      return NotFound();
    }

    _mapper.Map(productDto, product);
    await _warehouseRepository.SaveChangesAsync();
    return Ok(product);
  }

  [HttpDelete("{productId}")]
  [Authorize(Roles = "Admin")] // Only Admin can delete products
  public async Task<IActionResult> DeleteProduct(int productId)
  {
    await _warehouseRepository.DeleteProductAsync(productId);
    await _warehouseRepository.SaveChangesAsync();
    return Ok();
  }
}
