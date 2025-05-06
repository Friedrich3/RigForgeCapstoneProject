using CapstoneProject.DTOs.SupportTables;

namespace CapstoneProject.DTOs.Gpu
{
    public class BackOfficeGpuDto
    {
        public required Guid GpuId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required string Chipset { get; set; }
        public int Vram { get; set; }
        public int Tdp { get; set; }
        public required string PcieVersion { get; set; } 
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        //FKs
        public required SingleSupportItemDto Manufacturer { get; set; } 
    }
}
