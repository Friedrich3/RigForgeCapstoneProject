namespace CapstoneProject.DTOs.Cpu
{
    public class DetailCpuDto
    {
        public required Guid CpuId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required int Cores { get; set; }
        public required int Threads { get; set; }
        public required decimal BaseClock { get; set; }
        public required decimal BoostClock { get; set; }
        public required int Tdp { get; set; }
        public required bool IntegratedGraphics { get; set; }
        public int ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }

        public required string Manufacturer { get; set; }
        public required string Socket { get; set; } 
    }
}
