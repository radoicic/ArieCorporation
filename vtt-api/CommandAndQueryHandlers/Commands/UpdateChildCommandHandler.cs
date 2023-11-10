using AutoMapper;
using MediatR;
using System.Diagnostics.Metrics;
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
    [AuthorizeVttHandler("Children", ModuleAction.Edit)]

    public class UpdateChildCommandHandler : AbstractVttRequestHandler<UpdateChildCommand, Child>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public UpdateChildCommandHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        public async override Task<VttHandlerResponse<Child>> Handle(UpdateChildCommand request, CancellationToken cancellationToken)
        {
            var item = _vttContext.Children.FirstOrDefault(x => x.ChildId == request.ChildId);

            if (item != null)
            {
                item.FirstName = request.FirstName;
                item.MiddleName = request.MiddleName;
                item.LastName = request.LastName;
                item.Address = request.Address;
                item.Sex = request.Sex;
                item.NationalityCountryId = request.NationalityCountryId;
                item.Dob = request.Dob;

                await _vttContext.SaveChangesAsync();
                return Success(item);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
