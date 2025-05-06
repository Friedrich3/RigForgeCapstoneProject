namespace CapstoneProject.DTOs.Cpu
{
    public class CpuQueryParamsDto
    {
        public string? Search { get; set; }
        //Reference to ManufacturerId to not show Id on searchBar
        public int? Manufacturer { get; set; }
        //Reference to SocketId to not show Id on searchBar
        public int? Socket { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public string SortBy { get; set; } = "releaseYear";
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;


        //Pre-compatibility researchFilter (Selected MoboId goes-In)
        public Guid? CkSocket {  get; set; }
    }
}
