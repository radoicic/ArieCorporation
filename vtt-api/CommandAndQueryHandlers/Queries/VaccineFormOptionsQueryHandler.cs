using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    public class VaccineFormOptionsQueryHandler : AbstractVttRequestHandler<VaccineFormOptionsQuery, VaccineFormOptions>
    {
        public readonly VttContext _vttContext;
        public VaccineFormOptionsQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<VaccineFormOptions>> Handle(VaccineFormOptionsQuery request, CancellationToken cancellationToken)
        {
            var predictedDates = await (from date in _vttContext.PredictedDates
                         select new PredictedDateOption()
                         {
                             PredictedDateId = date.PredictedDateId,
                             PredictedDateName = date.PredictedDateName
                         }).ToListAsync(cancellationToken);
            var units = await (from unit in _vttContext.Units
                                 select new UnitOption()
                                 {
                                      UnitId = unit.UnitId,
                                      UnitName = unit.UnitName,
                                 }).ToListAsync(cancellationToken);
            var options = new VaccineFormOptions
            {
                UnitOptions = units,
                PredictedDateOptions = predictedDates
            };
            return Success(options);
        }
    }
}
