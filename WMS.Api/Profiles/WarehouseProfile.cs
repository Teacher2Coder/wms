using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class WarehouseProfile : Profile
{
  public WarehouseProfile()
  {
    CreateMap<Warehouse, WarehouseDto>()
      .ForMember(dest => dest.TotalInventory, opt => opt.Ignore())
      .ForMember(dest => dest.AvailableInventory, opt => opt.Ignore())
      .ForMember(dest => dest.ReservedInventory, opt => opt.Ignore())
      .ForMember(dest => dest.InTransitInventory, opt => opt.Ignore())
      .ForMember(dest => dest.DamagedInventory, opt => opt.Ignore())
      .ForMember(dest => dest.ExpiredInventory, opt => opt.Ignore());

    CreateMap<WarehouseDto, Warehouse>();
  }
}
