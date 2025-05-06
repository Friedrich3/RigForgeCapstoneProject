namespace CapstoneProject.DTOs.PowerSupply
{
    public class PsuQueryParamsDto
    {
        public string? Search { get; set; }
        //refer Id
        public int? Manufacturer { get; set; }

        public int? minPrice { get; set; }
        public int? maxPrice { get; set; }

        public int? MinWattage { get; set; }
        public int? MaxWattage { get; set; }
        public bool? Modular { get; set; } // true/false/null

        public string SortBy { get; set; } = "releaseYear"; // oppure "wattage", "price"
        public string SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 12;


        //Pre-compatibility researchFilter (Total Build Wattage goes here)
        public int? CkWattage { get; set; }
    }
}
