namespace Vtt_Api.Domain.Dtos
{
    public class SessionForUi
    {
        public string Token { get; set; }
        public VttClaims Claims { get; set; }
    }
}
