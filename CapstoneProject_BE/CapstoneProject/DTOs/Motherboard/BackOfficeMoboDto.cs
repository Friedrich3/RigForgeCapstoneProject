using CapstoneProject.DTOs.SupportTables;

namespace CapstoneProject.DTOs.Motherboard
{
    public class BackOfficeMoboDto
    {
        public required Guid MotherboardId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int MaxRam { get; set; }
        public int RamSlots { get; set; }
        public required string Chipset { get; set; } 
        public bool WifiIncluded { get; set; }
        public int PcieSlots { get; set; }
        public int M2Slots { get; set; }
        public int ReleaseYear { get; set; }

        public string? Description { get; set; }
        public string? Image { get; set; }

        public required SingleSupportItemDto Manufacturer { get; set; } 
        public required SingleSupportItemDto RamType { get; set; } 
        public required SingleSupportItemDto Socket { get; set; } 
        public required SingleSupportItemDto FormFactor { get; set; } 
    }
}
