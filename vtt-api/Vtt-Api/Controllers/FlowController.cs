using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FlowController : AbstractVttController
    {
        private readonly IMediator _mediator;
        public FlowController(ILoggerService loggerService, IMediator mediator) : base(loggerService)
        {
            _mediator = mediator;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> DraftFlowRegistration([FromBody] DraftFlowRegistrationCommand draftFlowRegistrationCommand)
        {
            VttHandlerResponse<int> result = new();
            try
            {
                result = await _mediator.Send(draftFlowRegistrationCommand);
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
        public async Task<IActionResult> GetFlowRegistrationDraft([FromQuery] FlowRegistrationDraftQuery flowRegistrationDraftQuery)
        {
            VttHandlerResponse<string> result = new();
            try
            {
                result = await _mediator.Send(flowRegistrationDraftQuery);
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
        public async Task<IActionResult> GetFlowRegistrationDraftList([FromQuery] FlowRegistrationDraftListQuery flowRegistrationDraftListQuery)
        {
            VttHandlerResponse<List<DraftForUi>> result = new();
            try
            {
                result = await _mediator.Send(flowRegistrationDraftListQuery);
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
        public async Task<IActionResult> SubmitDraft([FromBody] SubmitFlowDraftCommand submitFlowDraftCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediator.Send(submitFlowDraftCommand);
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
        [HttpGet("[action]")]
        public async Task<IActionResult> GetSdpContext()
        {
            VttHandlerResponse<int?> result = new();
            try
            {
                result = await _mediator.Send(new SdpContextQuery());
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
        public async Task<IActionResult> SetSdpContext([FromBody] SetSdpContextCommand setSdpContextCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediator.Send(setSdpContextCommand);
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
        [HttpGet("[action]")]
        public async Task<IActionResult> LookupChildren([FromQuery] LookupQuery<Child> lookupChildrenQuery)
        {
            VttHandlerResponse<List<Child>> result = new();
            try
            {
                result = await _mediator.Send(lookupChildrenQuery);
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
        public async Task<IActionResult> LookupGuardians([FromQuery] LookupQuery<Traveler> lookupChildrenQuery)
        {
            VttHandlerResponse<List<Traveler>> result = new();
            try
            {
                result = await _mediator.Send(lookupChildrenQuery);
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
