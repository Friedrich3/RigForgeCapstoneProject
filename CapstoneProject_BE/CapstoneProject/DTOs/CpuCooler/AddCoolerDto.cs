using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.CpuCooler
{
    public class AddCoolerDto
    {
        public required string Name { get; set; }
        public required CoolerType Type { get; set; }
        public required int Tdp { get; set; }
        public required string Price { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }
        public required int ManufacturerId { get; set; }
        public List<int> CompatibleSocketIds { get; set; } = new List<int>();
    }
}
