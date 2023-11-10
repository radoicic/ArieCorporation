using MediatR;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandAndQueryProtocol
{
    public class VttRequest : IRequest<VttHandlerResponse>
    {
        [JsonIgnore]
        public VttClaims? VttClaims { get; set; }
    }
    public class VttRequest<TResponse> : IRequest<VttHandlerResponse<TResponse>>
    {
        [JsonIgnore]
        public VttClaims? VttClaims { get; set; }
    }
}
