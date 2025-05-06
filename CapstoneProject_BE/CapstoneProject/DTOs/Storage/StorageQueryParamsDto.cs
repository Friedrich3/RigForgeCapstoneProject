namespace CapstoneProject.DTOs.Storage
{
    public class StorageQueryParamsDto
    {
        public string? Search { get; set; }
        //refer to ID
        public int? Manufacturer { get; set; }
        //refer to ID
        public int? StorageType { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public int? MinStorage { get; set; }
        public int? MaxStorage { get; set; }

        public string? Interface { get; set; } // SATA, NVMe, PCIe

        public string SortBy { get; set; } = "releaseYear"; // "capacity", "price"
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;
    }
}
