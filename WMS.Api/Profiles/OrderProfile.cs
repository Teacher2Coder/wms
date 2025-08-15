using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class OrderProfile : Profile
{
  public OrderProfile()
  {
    CreateMap<Order, OrderDto>();
    CreateMap<OrderDto, Order>()
      .ForMember(dest => dest.Items, opt => opt.Ignore())
      .ForMember(dest => dest.Id, opt => opt.Ignore()); // Don't map Id during updates
  }
}
