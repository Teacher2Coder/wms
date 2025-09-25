using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;
using WMS.Api.Entities;
using WMS.Api.Extensions;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/product")]
//[Authorize] // Require authentication for all product operations
public class ProductController : ControllerBase
{
  private readonly IMapper _mapper;
  private readonly IWarehouseRepository _warehouseRepository;
  private readonly IActionLogService _actionLogService;

  public ProductController(IMapper mapper, IWarehouseRepository warehouseRepository, IActionLogService actionLogService)
  {
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    _warehouseRepository = warehouseRepository ?? throw new ArgumentNullException(nameof(warehouseRepository));
    _actionLogService = actionLogService ?? throw new ArgumentNullException(nameof(actionLogService));
  }

  [HttpGet]
  public async Task<IActionResult> GetAllProducts()
  {
    var products = await _warehouseRepository.GetAllProductsAsync();
    var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
    return Ok(productDtos);
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

  [HttpGet("search/name")]
  public async Task<IActionResult> SearchProducts(string name)
  {
    var products = await _warehouseRepository.GetProductsByNameAsync(name);
    var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
    return Ok(productDtos);
  }

  [HttpGet("search/sku")]
  public async Task<IActionResult> SearchProductsBySku(string sku)
  {
    var products = await _warehouseRepository.GetProductsBySkuAsync(sku);
    var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
    return Ok(productDtos);
  }

  [HttpPost]
  //[Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can create products
  public async Task<IActionResult> CreateProduct(ProductDto productDto)
  {
    try
    {
      var product = _mapper.Map<Product>(productDto);
      await _warehouseRepository.CreateProductAsync(product);

      var createdProductDto = _mapper.Map<ProductDto>(product);
      await this.LogActionAsync(_actionLogService, "CREATE", "Product", product.Id, product.Name,
        $"Created product: {product.Name}", null, productDto);

      return Ok(createdProductDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "CREATE", "Product", null, productDto.Name,
        $"Failed to create product: {productDto.Name}", null, productDto, false, ex.Message);
      throw;
    }
  }

  [HttpPut("{productId}")]
  //[Authorize(Roles = "Admin,Manager")] // Only Admin and Manager can update products
  public async Task<IActionResult> UpdateProduct(int productId, ProductDto productDto)
  {
    try
    {
      var product = await _warehouseRepository.GetProductByIdAsync(productId);
      if (product == null)
      {
        await this.LogActionAsync(_actionLogService, "UPDATE", "Product", productId, productDto.Name,
          $"Failed to update product: {productDto.Name}", null, productDto, false, "Product not found");

        return NotFound();
      }

      _mapper.Map(productDto, product);
      await _warehouseRepository.SaveChangesAsync();

      var updatedProductDto = _mapper.Map<ProductDto>(product);
      await this.LogActionAsync(_actionLogService, "UPDATE", "Product", productId, productDto.Name,
        $"Updated product: {productDto.Name}", null, productDto);

      return Ok(updatedProductDto);
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "UPDATE", "Product", productId, productDto.Name,
        $"Failed to update product: {productDto.Name}", null, productDto, false, ex.Message);
      throw;
    }
  }

  [HttpDelete("{productId}")]
  //[Authorize(Roles = "Admin")] // Only Admin can delete products
  public async Task<IActionResult> DeleteProduct(int productId)
  {
    try
    {
      var product = await _warehouseRepository.GetProductByIdAsync(productId);
      if (product == null)
      {
        await this.LogActionAsync(_actionLogService, "DELETE", "Product", productId, product?.Name,
          $"Failed to delete product: {product?.Name}", null, product, false, "Product not found");

        return NotFound("Product not found");
      }

      await _warehouseRepository.DeleteProductAsync(productId);
      await _warehouseRepository.SaveChangesAsync();

      await this.LogActionAsync(_actionLogService, "DELETE", "Product", productId, product.Name,
        $"Deleted product: {product.Name}", null, product);

      return Ok();
    }
    catch (Exception ex)
    {
      await this.LogActionAsync(_actionLogService, "DELETE", "Product", productId, null,
        $"Failed to delete product: {productId}", null, null, false, ex.Message);
      throw;
    }
  }
}
