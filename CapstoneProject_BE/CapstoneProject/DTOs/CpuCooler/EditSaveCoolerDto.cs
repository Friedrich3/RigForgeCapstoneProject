using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.CpuCooler
{
    public class EditSaveCoolerDto
    {
        public required string Name { get; set; }
        public required CoolerType Type { get; set; }
        public required int Tdp { get; set; }
        public required string Price { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } = null;
        public required int ManufacturerId { get; set; }
        public List<int> CompatibleSocketIds { get; set; } = new List<int>();
    }
}
