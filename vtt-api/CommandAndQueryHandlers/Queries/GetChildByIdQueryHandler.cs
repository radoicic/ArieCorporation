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
    [AuthorizeVttHandler("Children", ModuleAction.View)]
    public class GetChildByIdQueryHandler : AbstractVttRequestHandler<GetChildByIdQuery, GetChildUI>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public GetChildByIdQueryHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        
        public async override Task<VttHandlerResponse<GetChildUI>> Handle(GetChildByIdQuery request, CancellationToken cancellationToken)
        {
            // TO-DO: Consider using a view for this
            var model = await _vttContext.Children.Where( x => x.ChildId == request.id).FirstOrDefaultAsync();

            if (model != null)
            {
                string dob = model.Dob.ToString("yyyy-MM-dd");

                var result = new GetChildUI()
                {
                    Id = model.ChildId,
                    Address = model.Address,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    MiddleName = model.MiddleName,
                    Nationality = model.NationalityCountryId,
                    Sex = model.Sex,
                    Dob = dob,
                };

                return Success(result);
            }
            else
                return NotFound();
        }
    }
}