using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler]
    public class SdpContextQueryHandler : AbstractVttRequestHandler<SdpContextQuery, int?>
    {
        public readonly VttContext _vttContext;
        public SdpContextQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public override async Task<VttHandlerResponse<int?>> Handle(SdpContextQuery request, CancellationToken cancellationToken)
        {
            var userId = int.Parse(request.VttClaims.UserId);
            var sdpId = (from user in _vttContext.Users
                         join userSecondary in _vttContext.UserSecondaries on user.UserSecondaryId equals userSecondary.UserSecondaryId
                         where user.UserId == userId
                         select userSecondary.FlowRecordSdpId).FirstOrDefault();
            return Success(sdpId);
        }
    }
}
