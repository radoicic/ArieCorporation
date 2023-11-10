using Azure.Core;
using Microsoft.EntityFrameworkCore;
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
    [AuthorizeVttHandler("Vaccine Inventory", ModuleAction.Add)]

    public class AddVaccineCommandHandler : AbstractVttRequestHandler<AddVaccineCommand, VaccineDto>
    {
        public readonly VttContext _vttContext;
        public AddVaccineCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<VaccineDto>> Handle(AddVaccineCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync();
            var category = new VaccineCategory()
            {
                VaccineCategoryName = request.VaccineCategoryName,
            };
            _vttContext.VaccineCategories.Add(category);
            await _vttContext.SaveChangesAsync(cancellationToken);

            foreach (VaccineManufacturerDto req in request.VaccineManufacturerData)
            {

                var vaccineManufacturer = new VaccineManufacturer()
                {
                    VaccineCategoryId = category.VaccineCategoryId,
                    ManufacturerName = req.ManufacturerName,
                    Lot = req.Lot,
                    Quantity = req.Quantity,
                    Expiration = (DateTime)req.Expiration,
                    Visedition = req.Visedition,
                    Dose = req.Dose,
                    UnitId = 3,
                    RefillDose = req.RefillDose,
                };
                await _vttContext.VaccineManufacturers.AddAsync(vaccineManufacturer, cancellationToken);
                await _vttContext.SaveChangesAsync(cancellationToken);
            }
            foreach (VaccineDoseDto req in request.VaccineDoseData)
            {

                var vaccineDose = new VaccineDose()
                {
                    VaccineCategoryId = category.VaccineCategoryId,
                    VaccineDoseName = req.VaccineDoseName,
                    PredictedDateStartId = req.PredictedStartDateId,
                    PredictedDateEndId = req.PredictedEndDateId,
                    DoseNo = req.DoseNo
                };
                await _vttContext.VaccineDoses.AddAsync(vaccineDose, cancellationToken);
                await _vttContext.SaveChangesAsync(cancellationToken);
            }
            await transaction.CommitAsync(cancellationToken);
            var vaccineInventory = new VaccineDto
            {
                VaccineCategoryId = category.VaccineCategoryId,
                VaccineCategoryName = category.VaccineCategoryName,
                VaccineManufacturerData = request.VaccineManufacturerData,
                VaccineDoseData = request.VaccineDoseData,
            };
            return Success(vaccineInventory);
        }
    }
}
