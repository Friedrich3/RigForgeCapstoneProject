using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.CpuCooler
{
    public class CoolerQueryParamsDto
    {
        public string? Search { get; set; }
        public CoolerType? Type { get; set; } // "Air" o "Liquid"
        public int? Manufacturer { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public string SortBy { get; set; } = "price"; // "tdp", "price"
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;

        //Pre-compatibility researchFilter (Selected CpuId goes-In)
        public Guid? CkSocketCpu { get; set; }
        //Pre-compatibility researchFilter (Selected MoboId goes-In)
        public Guid? CkSocketMobo { get; set; }
    }
}
