using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Security.Cryptography.X509Certificates;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Traveler", ModuleAction.Add)]

    public class AddTravelerCommandHandler : AbstractVttRequestHandler<AddTravelerCommand, TravelerDto>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public AddTravelerCommandHandler(VttContext vttContext, IMapper mapper)
        {
            _mapper = mapper;
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<TravelerDto>> Handle(AddTravelerCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync();
            var result = new TravelerDto()
            {
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                Address = request.Address,
                Sex = request.Sex,
                NationalityCountryId = request.NationalityCountryId,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
            };

            var model = _mapper.Map<Traveler>(result);

            await _vttContext.Travelers.AddAsync(model);
            await _vttContext.SaveChangesAsync();

            result.TravelerId = model.TravelerId;

            await transaction.CommitAsync(cancellationToken);
            return Success(result);
        }
    }
}
