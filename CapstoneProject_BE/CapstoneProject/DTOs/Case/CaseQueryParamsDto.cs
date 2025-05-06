namespace CapstoneProject.DTOs.Case
{
    public class CaseQueryParamsDto
    {
        public string? Search { get; set; }
        //Refer to ID
        public int? Manufacturer { get; set; }
        //Refer to ID
        public int? FormFactor { get; set; }

        public string? Color { get; set; }
        public bool? GlassPanel { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public string SortBy { get; set; } = "releaseYear"; // "fanSupport", "price"
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 12;

        //Pre-compatibility researchFilter (Selected MoboId goes-In)
        public Guid? CkFormFactor { get; set; }
    }
}
