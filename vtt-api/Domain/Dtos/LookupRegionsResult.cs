namespace Vtt_Api.Domain.Dtos
{
    public class AllLookupRegions
    {
        public short Id { get; set; }
        //public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string SmallCode { get; set; } = null!;
    }
    public class LookupRegionsResult
    {
        public List<AllLookupRegions>? LookupRegions { get; set; }

    }
}
