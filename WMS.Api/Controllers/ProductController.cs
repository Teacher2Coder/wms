using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WMS.Api.Services;
using WMS.Api.Models;

namespace WMS.Api.Controllers;

[ApiController]
[Route("api/product")]
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
}
