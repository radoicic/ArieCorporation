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
    [AuthorizeVttHandler("Vaccine Inventory", ModuleAction.Edit)]

    public class UpdateVaccineCommandHandler : AbstractVttRequestHandler<UpdateVaccineCommand, VaccineDto>
    {
        public readonly VttContext _vttContext;
        public UpdateVaccineCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<VaccineDto>> Handle(UpdateVaccineCommand request, CancellationToken cancellationToken)
        {
            var category = _vttContext.VaccineCategories.FirstOrDefault(x => x.VaccineCategoryId == request.VaccineCategoryId);
            if (category != null)
            {
                await using var transaction = await _vttContext.Database.BeginTransactionAsync(cancellationToken);
                var existingManufacturers = _vttContext.VaccineManufacturers.Where(x => x.VaccineCategoryId == request.VaccineCategoryId).ToList();
                var manufacturersToDelete = existingManufacturers.Where(x => !request.VaccineManufacturerData.Any(y => x.VaccineManufacturerId == y.VaccineManufacturerId)).ToList();
                _vttContext.VaccineManufacturers.RemoveRange(manufacturersToDelete);
                await _vttContext.SaveChangesAsync(cancellationToken);
                foreach (VaccineManufacturerDto req in request.VaccineManufacturerData)
                {
                    if(req.VaccineManufacturerId != null && req.VaccineManufacturerId > 0)
                    {
                        var manufacturer = existingManufacturers.FirstOrDefault(x => x.VaccineManufacturerId == req.VaccineManufacturerId);
                        manufacturer.ManufacturerName = req.ManufacturerName;
                        manufacturer.Lot = req.Lot;
                        manufacturer.Quantity = req.Quantity;
                        manufacturer.Expiration = req.Expiration;
                        manufacturer.Visedition = req.Visedition;
                        manufacturer.Dose = req.Dose;
                        manufacturer.UnitId = req.UnitId;
                        manufacturer.RefillDose = req.RefillDose;
                        _vttContext.VaccineManufacturers.Update(manufacturer);
                    }
                    else
                    {
                        var vaccineManufacturer = new VaccineManufacturer()
                        {
                            VaccineCategoryId = category.VaccineCategoryId,
                            ManufacturerName = req.ManufacturerName,
                            Lot = req.Lot,
                            Quantity = req.Quantity,
                            Expiration = req.Expiration,
                            Visedition = req.Visedition,
                            Dose = req.Dose,
                            UnitId = req.UnitId,
                            RefillDose = req.RefillDose,
                        };
                        await _vttContext.VaccineManufacturers.AddAsync(vaccineManufacturer, cancellationToken);
                    }
                }
                await _vttContext.SaveChangesAsync(cancellationToken);
                var existingDoses = _vttContext.VaccineDoses.Where(x => x.VaccineCategoryId == request.VaccineCategoryId).ToList();
                var dosesToDelete = existingDoses.Where(x => !request.VaccineDoseData.Any(y => x.VaccineDoseId == y.VaccineDoseId)).ToList();
                _vttContext.VaccineDoses.RemoveRange(dosesToDelete);
                await _vttContext.SaveChangesAsync(cancellationToken);
                foreach (VaccineDoseDto req in request.VaccineDoseData)
                {

                    if (req.VaccineDoseId != null && req.VaccineDoseId > 0)
                    {
                        var dose = existingDoses.FirstOrDefault(x => x.VaccineDoseId == req.VaccineDoseId);
                        dose.VaccineDoseName = req.VaccineDoseName;
                        dose.PredictedDateStartId = req.PredictedStartDateId;
                        dose.PredictedDateEndId = req.PredictedEndDateId;
                        dose.DoseNo = req.DoseNo;
                        _vttContext.VaccineDoses.Update(dose);
                    }
                    else
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
                    }
                }

                await _vttContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                var vaccineInventory = new VaccineDto();
                vaccineInventory.VaccineCategoryId = category.VaccineCategoryId;
                vaccineInventory.VaccineCategoryName = category.VaccineCategoryName;
                // TO-DO: Fill Other properties
                return Success(vaccineInventory);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
