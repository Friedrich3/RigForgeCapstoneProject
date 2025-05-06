using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.CpuCooler
{
    public class SingleGetCoolerDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public CoolerType Type { get; set; }
        public int Tdp { get; set; }
        public required decimal Price { get; set; }
        public string? Image { get; set; }
        public required List<string> Socket { get; set; } //Nome Socket
    }
}
