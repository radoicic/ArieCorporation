using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.Domain.Dtos;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Children", ModuleAction.View)]
    public class GetChildListQueryHandler : AbstractVttRequestHandler<GetChildListQuery, List<ChildListUI>>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public GetChildListQueryHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        
        public async override Task<VttHandlerResponse<List<ChildListUI>>> Handle(GetChildListQuery request, CancellationToken cancellationToken)
        {
            // TO-DO: Consider using a view for this
            var models = await _vttContext.Children.Skip((request.pageNumber - 1) * request.pageSize).Take(request.pageSize).ToListAsync(); ;
            var results = new List<ChildListUI>();

            foreach(var item in models)
            {
                DateTime currentDate = DateTime.Now;

                int ageYears = currentDate.Year - item.Dob.Year;
                int ageMonths = currentDate.Month - item.Dob.Month;

                if (currentDate.Day < item.Dob.Day)
                {
                    ageMonths--;
                }

                if (ageMonths < 0)
                {
                    ageYears--;
                    ageMonths += 12;
                }

                string ageString = $"{ageYears}Y {ageMonths}M";

                string nationality = _vttContext.Countries.Where(x => x.CountryId == item.NationalityCountryId).FirstOrDefault().CountryName ?? "";
                string gender = "other";
                switch(item.Sex)
                {
                    case 1:
                        gender = "Male";
                        break;
                    case 2:
                        gender = "Female";
                        break;
                    default:
                        gender = "Other";
                        break;
                }

                var tempItem = new ChildListUI()
                {
                    Id = item.ChildId,
                    Address = item.Address,
                    Avatar = "",
                    Name = item.FirstName + " " + item.MiddleName + " " + item.LastName,
                    Age = ageString,
                    Sex = gender,
                    Nationality = nationality,
                };

                results.Add(tempItem);
            }

            return Success(results);
        }
    }
}