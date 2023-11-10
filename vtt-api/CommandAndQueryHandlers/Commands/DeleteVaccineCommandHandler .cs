using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Vaccine Inventory", ModuleAction.Delete)]

    public class DeleteVaccineCommandHandler : AbstractVttCommandHandler<DeleteVaccineCommand>
    {
        public readonly VttContext _vttContext;
        public DeleteVaccineCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse> Handle(DeleteVaccineCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync(cancellationToken);
            var category = _vttContext.VaccineCategories.FirstOrDefault(x => x.VaccineCategoryId == request.VaccineCategoryId);
            if(category == null)
            {
                return NotFound();
            }
            var doses = _vttContext.VaccineDoses.Where(x => x.VaccineCategoryId == category.VaccineCategoryId);
            _vttContext.VaccineDoses.RemoveRange(doses);
            var manufactuerers = _vttContext.VaccineManufacturers.Where(x => x.VaccineCategoryId == category.VaccineCategoryId);
            _vttContext.VaccineManufacturers.RemoveRange(manufactuerers);
            await _vttContext.SaveChangesAsync(cancellationToken);
            _vttContext.VaccineCategories.Remove(category);
            await _vttContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);
            return Success();
        }
    }
}
