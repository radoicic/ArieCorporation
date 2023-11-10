namespace Vtt_Api.Domain.Dtos
{
    public class RegionAssignmentForUi
    {
        public short? CountryId { get; set; }
        public int? ProvinceId { get; set; }
        public int? DistrictId { get; set; }
        public int? VillageId { get; set; }
        public int? SdpId { get; set; }
    }
}
