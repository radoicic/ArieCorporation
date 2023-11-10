using Vtt_Api.Domain.Enums;

namespace Vtt_Api.Domain.Dtos
{
    public class FlowFormData
    {
        public List<GuardianFormItem> GuardianFormData { get; set; }
        public List<ChildFormItem> ChildFormData { get; set; }
        public TravelFormData TravelFormData { get; set; }
        public VaccineFormData VaccineFormData { get; set; }
    }

    public class GuardianFormItem
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public Sex Sex { get; set; }
        public short NationalityCountryId { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int? TravelerId { get; set; }
    }

    public class ChildFormItem
    {
        public string Photo { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Sex Sex { get; set; }
        public short NationalityCountryId { get; set; }
        public int? ChildId { get; set; }
        public string TempId { get; set; }
    }

    public class TravelFormData
    {
        public short OriginCountryId{ get; set; }
        public int OriginProvinceId { get; set; }
        public int OriginDistrictId { get; set; }
        public int OriginVillageId { get; set; }
        public short DestinationCountryId { get; set; }
        public int DestinationProvinceId { get; set; }
        public int DestinationDistrictId { get; set; }
        public int DestinationVillageId { get; set; }
        public ModeOfTransport ModeOfTransport { get; set; }
        public string TravelReason { get; set; }
    }

    public class VaccineFormData
    {
        public List<VaccineFormItem> VaccineFormItems { get; set; }

    }

    public class VaccineFormItem
    {
        public string ChildTempId { get; set; }
        public string CardPhoto { get; set; }
    }
}
