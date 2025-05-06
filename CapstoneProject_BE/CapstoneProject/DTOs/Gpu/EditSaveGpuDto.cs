namespace CapstoneProject.DTOs.Gpu
{
    public class EditSaveGpuDto
    {
        public required string Name { get; set; }
        public required string Chipset { get; set; }
        public required int Vram { get; set; }
        public required string Price { get; set; }
        public required int Tdp { get; set; }
        public required string PcieVersion { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } = null;
        //FKs
        public required int ManufacturerId { get; set; }
    }
}
