using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.Add)]
    public class LookupChildrenQueryHandler : AbstractVttRequestHandler<LookupQuery<Child>, List<Child>>
    {
        public readonly VttContext _vttContext;
        public LookupChildrenQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<List<Child>>> Handle(LookupQuery<Child> request, CancellationToken cancellationToken)
        {
            var query = _vttContext.Children.AsQueryable();
            if(!string.IsNullOrEmpty(request.FirstName))
            {
                query = query.Where(x => x.FirstName.ToLower().Contains(request.FirstName.ToLower()));
            }
            if (!string.IsNullOrEmpty(request.MiddleName))
            {
                query = query.Where(x => x.MiddleName.ToLower().Contains(request.MiddleName.ToLower()));
            }
            if (!string.IsNullOrEmpty(request.LastName))
            {
                query = query.Where(x => x.LastName.ToLower().Contains(request.LastName.ToLower()));
            }
            if (!string.IsNullOrEmpty(request.CountryName))
            {
                query = query.Where(x => x.NationalityCountry.CountryName.ToLower().Contains(request.CountryName.ToLower()));
            }
            var queryOut = query.ToList();
            return Success(queryOut);
        }
    }
}
