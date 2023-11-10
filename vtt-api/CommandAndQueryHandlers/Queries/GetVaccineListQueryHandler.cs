using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.Domain.Dtos;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Vaccine Inventory", ModuleAction.View)]
    public class GetVaccineListQueryHandler : AbstractVttRequestHandler<GetVaccineListQuery, List<VaccineDto>>
    {
        public readonly VttContext _vttContext;
        public GetVaccineListQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        
        public async override Task<VttHandlerResponse<List<VaccineDto>>> Handle(GetVaccineListQuery request, CancellationToken cancellationToken)
        {
            // TO-DO: Consider using a view for this

            var vaccineCategories = (from vCategory in _vttContext.VaccineCategories
               select new VaccineDto()
               {
                   VaccineCategoryId = vCategory.VaccineCategoryId,
                   VaccineCategoryName = vCategory.VaccineCategoryName,
               }).ToList();

            foreach (var item in vaccineCategories)
            {
                var manufacturerData = _vttContext.VaccineManufacturers.Where(x => x.VaccineCategoryId == item.VaccineCategoryId).ToList();
                item.VaccineManufacturerData = await (from manufacturer in _vttContext.VaccineManufacturers
                                             where manufacturer.VaccineCategoryId == item.VaccineCategoryId
                                             join unit in _vttContext.Units on manufacturer.UnitId equals unit.UnitId
                                             select new VaccineManufacturerDto()
                                             {
                                                 VaccineManufacturerId = manufacturer.VaccineManufacturerId,
                                                 ManufacturerName = manufacturer.ManufacturerName,
                                                 Lot = manufacturer.Lot,
                                                 Quantity = manufacturer.Quantity,
                                                 UnitId = manufacturer.UnitId,
                                                 Unit = unit.UnitName,
                                                 Dose = manufacturer.Dose,
                                                 Expiration = manufacturer.Expiration,
                                                 Visedition = manufacturer.Visedition
                                             }).ToListAsync(cancellationToken);
                item.VaccineDoseData = await (from dose in _vttContext.VaccineDoses
                                              where dose.VaccineCategoryId == item.VaccineCategoryId
                                              join predictedStartDate in _vttContext.PredictedDates on dose.PredictedDateStartId equals predictedStartDate.PredictedDateId
                                              join predictedEndDate in _vttContext.PredictedDates on dose.PredictedDateEndId equals predictedEndDate.PredictedDateId
                                              select new VaccineDoseDto()
                                              {
                                                  VaccineDoseId = dose.VaccineDoseId,
                                                  VaccineDoseName = dose.VaccineDoseName,
                                                  DoseNo = dose.DoseNo,
                                                  PredictedStartDateId = predictedStartDate.PredictedDateId,
                                                  PredictedStartDate = predictedStartDate.PredictedDateName,
                                                  PredictedEndDateId = predictedEndDate.PredictedDateId,
                                                  PredictedEndDate = predictedEndDate.PredictedDateName,
                                              }).ToListAsync(cancellationToken);
            }

            return Success(vaccineCategories);
        }
    }
}