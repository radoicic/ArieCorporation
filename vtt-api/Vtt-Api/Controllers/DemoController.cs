using Microsoft.AspNetCore.Mvc;
using MediatR;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Services.Interface;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DemoController : AbstractVttController
    {
        private readonly IMediator _mediatR;
        public DemoController(IMediator mediatR, ILoggerService loggerService) : base(loggerService)
        {
            _mediatR = mediatR;
        }

        [HttpGet(Name = "GetVaccineCategories")]
        public async Task<IActionResult> Get()
        {
            VttHandlerResponse<List<VaccineDto>> result = new();
            try
            {
                var query = new GetVaccineListQuery();
                result = await _mediatR.Send(query);
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
        [HttpPost(Name = "DemoProcessData")]
        public async Task<IActionResult> Post()
        {
            VttHandlerResponse result = new();
            try
            {
                var query = new DemoProcessDataCommand();
                result = await _mediatR.Send(query);
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
