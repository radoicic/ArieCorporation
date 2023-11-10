namespace Vtt_Api.Domain.Dtos
{
    public class DraftForUi
    {
        public int SdpId { get; set; }
        public string SdpName { get; set; }
        public int DraftId { get; set; }
        public DateTime LastSavedAtUtc { get; set; }
    }
}
