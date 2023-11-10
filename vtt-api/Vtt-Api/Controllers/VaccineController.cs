using MediatR;
using Microsoft.AspNetCore.Mvc;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VaccineController : AbstractVttController
    {
        private readonly IMediator _mediatR;
        public VaccineController(IMediator mediatR, ILoggerService loggerService) : base(loggerService)
        {
            _mediatR = mediatR;

        }
     
        [HttpGet("[action]")]

        public async Task<IActionResult> GetVaccineCategoriesList([FromQuery] GetVaccineListQuery getVaccineListQuery)
        {
            VttHandlerResponse<List<VaccineDto>> result = new();
            try
            {
                result = await _mediatR.Send(getVaccineListQuery);
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetFormOptions()
        {
            VttHandlerResponse<VaccineFormOptions> result = new();
            try
            {
                result = await _mediatR.Send(new VaccineFormOptionsQuery());
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }

        }


        [HttpPost("[action]")]

        public async Task<IActionResult> AddVaccine([FromBody] AddVaccineCommand vaccineCommand)
        {
            VttHandlerResponse result = new();
            try
            {

                result = await _mediatR.Send(vaccineCommand);
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }

        }

        [HttpPost("[action]")]

        public async Task<IActionResult> UpdateVaccine([FromBody] UpdateVaccineCommand vaccineCommand)
        {
            VttHandlerResponse result = new();
            try
            {

                result = await _mediatR.Send(vaccineCommand);
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteVaccine([FromBody] DeleteVaccineCommand vaccineCommand)
        {
            VttHandlerResponse result = new();
            try
            {

                result = await _mediatR.Send(vaccineCommand);
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }

        }


    }
}
