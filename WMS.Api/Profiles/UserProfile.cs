using AutoMapper;
using WMS.Api.Entities;
using WMS.Api.Models;

namespace WMS.Api.Profiles;

public class UserProfile : Profile
{
  public UserProfile()
  {
    CreateMap<User, UserDto>();
    CreateMap<RegisterDto, User>()
      .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // We'll handle password hashing separately
      .ForMember(dest => dest.Id, opt => opt.Ignore())
      .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
      .ForMember(dest => dest.LastLoginAt, opt => opt.Ignore())
      .ForMember(dest => dest.IsActive, opt => opt.Ignore());
  }
}
