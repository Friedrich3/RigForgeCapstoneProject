namespace CapstoneProject.DTOs.Gpu
{
    public class SingleGetGpuDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Chipset { get; set; }
        public int Vram { get; set; }
        public required decimal Price { get; set; }
        public int Tdp { get; set; }
        public string? Image { get; set; }
    }
}
