using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class SectionProfile : Profile
{
  public SectionProfile()
  {
    CreateMap<Section, SectionDto>()
      .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));
    CreateMap<SectionDto, Section>()
      .ForMember(dest => dest.Items, opt => opt.Ignore())
      .ForMember(dest => dest.Warehouse, opt => opt.Ignore())
      .ForMember(dest => dest.Id, opt => opt.Ignore()); // Don't map Id during updates
  }
}
