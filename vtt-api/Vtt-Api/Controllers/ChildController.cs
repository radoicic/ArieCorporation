using MediatR;
using Microsoft.AspNetCore.Http;
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
    public class ChildController : AbstractVttController
    {
        private readonly IMediator _mediatR;
        public ChildController(IMediator mediatR, ILoggerService loggerService) : base(loggerService)
        {
            _mediatR = mediatR;

        }

        [HttpGet("[action]")]

        public async Task<IActionResult> GetChildList([FromQuery] GetChildListQuery getChildListQuery)
        {
            VttHandlerResponse<List<ChildListUI>> result = new();
            try
            {
                result = await _mediatR.Send(getChildListQuery);
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

        public async Task<IActionResult> GetCountryList([FromQuery] GetCountryListQuery getCountryListQuery)
        {
            VttHandlerResponse<List<CountryDto>> result = new();
            try
            {
                result = await _mediatR.Send(getCountryListQuery);
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

        public async Task<IActionResult> GetChildById([FromQuery] GetChildByIdQuery getChildById)
        {
            VttHandlerResponse<GetChildUI> result = new();
            try
            {
                result = await _mediatR.Send(getChildById);
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
        public async Task<IActionResult> AddChild([FromBody] AddChildCommand addCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediatR.Send(addCommand);
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

        [HttpPut("[action]")]

        public async Task<IActionResult> UpdateChild([FromBody] UpdateChildCommand updateCommand)
        {
            VttHandlerResponse result = new();
            try
            {

                result = await _mediatR.Send(updateCommand);
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

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteChild([FromQuery] DeleteChildCommand deleteCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediatR.Send(deleteCommand);
                if (result.HandlerResponseState != HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }
        }
    }
}
