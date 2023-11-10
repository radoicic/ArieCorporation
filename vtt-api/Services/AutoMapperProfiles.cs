using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.Domain.DataAccess;
using AutoMapper;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.Services
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Traveler, TravelerDto>().ReverseMap();
            CreateMap<Child, ChildDto>().ReverseMap();
        }
    }
}
