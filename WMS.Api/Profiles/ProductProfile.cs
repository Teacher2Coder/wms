using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class ProductProfile : Profile
{
  public ProductProfile()
  {
    CreateMap<Product, ProductDto>();
    CreateMap<ProductDto, Product>();
  }
}

