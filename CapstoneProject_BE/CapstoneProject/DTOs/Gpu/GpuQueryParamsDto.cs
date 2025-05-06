namespace CapstoneProject.DTOs.Gpu
{
    public class GpuQueryParamsDto
    {
        public string? Search { get; set; }
        public int? Manufacturer { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public string SortBy { get; set; } = "releaseYear"; 
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;
    }
}
