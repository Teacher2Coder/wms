using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class ItemProfile : Profile
{
  public ItemProfile()
  {
    CreateMap<Item, ItemDto>();
  }
}
