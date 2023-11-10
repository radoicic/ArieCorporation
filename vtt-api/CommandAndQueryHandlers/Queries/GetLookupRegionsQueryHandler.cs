using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Microsoft.EntityFrameworkCore;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Regions", ModuleAction.View)]
    public class GetLookupRegionsQueryHandler : AbstractVttRequestHandler<GetLookupRegionsQuery, LookupRegionsResult>
    {
        public readonly VttContext _vttContext;
        public GetLookupRegionsQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }

        public async override Task<VttHandlerResponse<LookupRegionsResult>> Handle(GetLookupRegionsQuery request, CancellationToken cancellationToken)
        {
            var lookupRegions = await (from row in _vttContext.LookupCountries
                                    select new AllLookupRegions()
                                    {
                                        Id = row.LookupCountryId,
                                        Name = row.Name,
                                        SmallCode = row.SmallCode
                                    }).ToListAsync();
            LookupRegionsResult result = new()
            {
                LookupRegions = lookupRegions
            };
            return Success(result);
        }
    }
}
