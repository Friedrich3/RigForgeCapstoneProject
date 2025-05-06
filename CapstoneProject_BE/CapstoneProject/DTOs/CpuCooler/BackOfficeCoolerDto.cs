using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.CpuCooler
{
    public class BackOfficeCoolerDto
    {
        public required Guid CpuCoolerId { get; set; }
        public required string Name { get; set; }
        public CoolerType Type { get; set; }
        public int Tdp { get; set; }
        public required decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }

        public SingleSupportItemDto Manufacturer { get; set; } 
        public List<SingleSupportItemDto> CompatibleSockets { get; set; } = new();
    }
}
