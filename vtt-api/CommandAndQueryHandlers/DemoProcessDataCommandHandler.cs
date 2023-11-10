using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers
{
    [AuthorizeVttHandler("Dashboard", new ModuleAction[] { ModuleAction.View, /* <- and -> */ ModuleAction.Edit }), /* <- or -> */ AuthorizeVttHandler("Dashboard", ModuleAction.Delete)]
    public class DemoProcessDataCommandHandler : AbstractVttCommandHandler<DemoProcessDataCommand>
    {
        public async override Task<VttHandlerResponse> Handle(DemoProcessDataCommand request, CancellationToken cancellationToken)
        {
            return Success();
        }
    }
}
