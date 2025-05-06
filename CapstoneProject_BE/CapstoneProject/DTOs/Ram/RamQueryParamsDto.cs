namespace CapstoneProject.DTOs.Ram
{
    public class RamQueryParamsDto
    {
        public string? Search { get; set; }
        //Refer to ID
        public int? Manufacturer { get; set; }
        //Refer to ID
        public int? RamType { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public int? MinCapacity { get; set; }
        public int? MaxCapacity { get; set; }

        public int? MinSpeed { get; set; }
        public int? MaxSpeed { get; set; }

        public string SortBy { get; set; } = "releaseyear"; // "capacity", "speed", "price"
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;

        //Pre-compatibility researchFilter (Selected MoboId goes-In)
        public Guid? CkRamType { get; set; }
    }
}
