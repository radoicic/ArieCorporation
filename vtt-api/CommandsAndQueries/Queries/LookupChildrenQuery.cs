using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.DataAccess;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class LookupQuery<T> : VttRequest<List<T>>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public string? CountryName { get; set; }
    }
}
