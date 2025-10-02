using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class ItemProfile : Profile
{
  public ItemProfile()
  {
    CreateMap<Item, ItemDto>()
      .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : string.Empty));
    CreateMap<ItemDto, Item>();
    CreateMap<ItemUpdateDto, Item>()
      .ForMember(dest => dest.SectionId, opt => opt.MapFrom(src => src.Section));
  }
}
