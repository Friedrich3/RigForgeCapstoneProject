namespace CapstoneProject.DTOs.Gpu
{
    public class AddGpuDto
    {
        public required string Name { get; set; }
        public required string Chipset { get; set; }
        public required int Vram { get; set; }
        public required string Price { get; set; }
        public required int Tdp { get; set; }
        public required string PcieVersion { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }

        //FKs
        public required int ManufacturerId { get; set; }
    }
}
