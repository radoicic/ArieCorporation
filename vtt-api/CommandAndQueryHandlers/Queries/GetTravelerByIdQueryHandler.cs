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
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Traveler", ModuleAction.View)]
    public class GetTravelerByIdQueryHandler : AbstractVttRequestHandler<GetTravelerByIdQuery, GetTravelerUI>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public GetTravelerByIdQueryHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        
        public async override Task<VttHandlerResponse<GetTravelerUI>> Handle(GetTravelerByIdQuery request, CancellationToken cancellationToken)
        {
            // TO-DO: Consider using a view for this
            var model = await _vttContext.Travelers.Where( x => x.TravelerId == request.id).FirstOrDefaultAsync();

            if (model != null)
            {
                string dob = model.Dob.ToString("yyyy-MM-dd");

                var result = new GetTravelerUI()
                {
                    Id = model.TravelerId,
                    Address = model.Address,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    MiddleName = model.MiddleName,
                    PhoneNumber = model.PhoneNumber,
                    Nationality = model.NationalityCountryId,
                    Sex = model.Sex,
                    Dob = dob,
                    Email = model.Email
                };

                return Success(result);
            }
            else
                return NotFound();
        }
    }
}