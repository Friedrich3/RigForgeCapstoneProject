using CapstoneProject.DTOs.SupportTables;

namespace CapstoneProject.DTOs.Ram
{
    public class BackOfficeRamDto
    {
        public required Guid RamId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int Capacity { get; set; }
        public int Modules { get; set; }
        public int Speed { get; set; }
        public int? ReleaseYear { get; set; }

        public string? Description { get; set; }
        public string? Image { get; set; }

        public required SingleSupportItemDto Manufacturer { get; set; } 
        public required SingleSupportItemDto RamType { get; set; } 
    }
}
