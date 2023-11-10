using MediatR;
using Microsoft.AspNetCore.Mvc;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegionController : AbstractVttController
    {
        private readonly IMediator _mediator;
        public RegionController(ILoggerService loggerService, IMediator mediator) : base(loggerService)
        {
            _mediator = mediator;
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetRegionDetails([FromQuery] GetRegionDetailsQuery getSubRegionsQuery)
        {
            VttHandlerResponse<RegionDetailsResult> result = new();
            try
            {
                result = await _mediator.Send(getSubRegionsQuery);
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
        public async Task<IActionResult> GetLookupRegions([FromQuery] GetLookupRegionsQuery getLookupRegionsQuery)
        {
            VttHandlerResponse<LookupRegionsResult> result = new();
            try
            {
                result = await _mediator.Send(getLookupRegionsQuery);
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
        public async Task<IActionResult> Transact([FromBody] AddRegionCommand addRegionCommand)
        {
            VttHandlerResponse<RegionForUi> result = new();
            try
            {
                result = await _mediator.Send(addRegionCommand);
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
        [HttpPut("[action]")]
        public async Task<IActionResult> Transact([FromBody] UpdateRegionCommand updateRegionCommand)
        {
            VttHandlerResponse<RegionForUi> result = new();
            try
            {
                result = await _mediator.Send(updateRegionCommand);
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
        public async Task<IActionResult> GetAssignedSdps()
        {
            VttHandlerResponse<List<RegionForUi>> result = new();
            try
            {
                result = await _mediator.Send(new AssignedSdpsQuery());
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
    }
}
