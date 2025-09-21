using AutoMapper;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class ActionProfile : Profile
{
  public ActionProfile()
  {
    CreateMap<Entities.Action, ActionDto>()
      .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
      .ForMember(dest => dest.UserRole, opt => opt.MapFrom(src => src.User.Role.ToString()));
  }
}
