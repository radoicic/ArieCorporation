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
    [AuthorizeVttHandler("Traveler", ModuleAction.View)]
    public class GetCountryListQueryHandler : AbstractVttRequestHandler<GetCountryListQuery, List<CountryDto>>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public GetCountryListQueryHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        
        public async override Task<VttHandlerResponse<List<CountryDto>>> Handle(GetCountryListQuery request, CancellationToken cancellationToken)
        {
            // TO-DO: Consider using a view for this

            var results = new List<CountryDto>();

            foreach(var item in _vttContext.Countries)
            {
                var countryItem = new CountryDto();
                countryItem.Id = item.CountryId;
                countryItem.Name = item.CountryName;

                results.Add(countryItem);
            }

            return Success(results);
        }
    }
}