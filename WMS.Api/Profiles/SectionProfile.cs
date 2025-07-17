using System;
using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class SectionProfile : Profile
{
  public SectionProfile()
  {
    CreateMap<Section, SectionDto>();
  }
}
