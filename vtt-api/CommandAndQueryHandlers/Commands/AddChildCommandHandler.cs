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
    [AuthorizeVttHandler("Children", ModuleAction.Add)]

    public class AddChildCommandHandler : AbstractVttRequestHandler<AddChildCommand, ChildDto>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public AddChildCommandHandler(VttContext vttContext, IMapper mapper)
        {
            _mapper = mapper;
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<ChildDto>> Handle(AddChildCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync();
            var result = new ChildDto()
            {
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                Address = request.Address,
                Sex = (byte)request.Sex,
                NationalityCountryId = request.NationalityCountryId,
                PhotoDataUrl = "",
            };

            var model = _mapper.Map<Child>(result);

            await _vttContext.Children.AddAsync(model);
            await _vttContext.SaveChangesAsync();

            result.ChildId = model.ChildId;

            await transaction.CommitAsync(cancellationToken);
            return Success(result);
        }
    }
}
