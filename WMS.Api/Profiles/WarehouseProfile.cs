using System;
using AutoMapper;

namespace WMS.Api.Profiles;

public class WarehouseProfile : Profile
{
  public WarehouseProfile()
  {
    CreateMap<Entities.Warehouse, Models.WarehouseDto>()
      .ForMember(dest => dest.TotalInventory, opt => opt.Ignore())
      .ForMember(dest => dest.AvailableInventory, opt => opt.Ignore())
      .ForMember(dest => dest.ReservedInventory, opt => opt.Ignore())
      .ForMember(dest => dest.InTransitInventory, opt => opt.Ignore())
      .ForMember(dest => dest.DamagedInventory, opt => opt.Ignore())
      .ForMember(dest => dest.ExpiredInventory, opt => opt.Ignore())
      .ForMember(dest => dest.OutOfStockInventory, opt => opt.Ignore())
      .ForMember(dest => dest.LowStockInventory, opt => opt.Ignore());
  }
}
