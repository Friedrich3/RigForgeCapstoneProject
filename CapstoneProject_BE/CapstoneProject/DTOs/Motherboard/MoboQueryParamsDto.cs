namespace CapstoneProject.DTOs.Motherboard
{
    public class MoboQueryParamsDto
    {
        public string? Search { get; set; }
        public int? Manufacturer { get; set; }
        public int? Socket { get; set; }
        public int? RamType { get; set; }
        public int? FormFactor { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public string SortBy { get; set; } = "releaseYear"; 
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;

        //Pre-compatibility researchFilter (Selected CpuId goes-In)
        public Guid? CkSocket { get; set; }
        //Pre-compatibility researchFilter (Selected RamId goes-In)
        public Guid? CkRamType { get; set; }
        //Pre-compatibility researchFilter (Selected CaseId goes-In)
        public Guid? CkFormFactor { get; set; }
    }
}
