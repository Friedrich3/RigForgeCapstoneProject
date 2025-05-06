using CapstoneProject.DTOs.Build;
using CapstoneProject.Models.Components;

namespace CapstoneProject.DTOs.SharedBuild
{
    public class SharedBuildDetailDto
    {
        public required int Id {  get; set; }
        public required Guid UserBuildId { get; set; }
        public required string Username { get; set; }

        public required string BuildName { get; set; }
        public string? Description { get; set; }

        //FROM USERBUILD
        public DateTime LastModified { get; set; }

        public required int? RequiredWattage { get; set; }

        public required int? MaxBuildWattage { get; set; }

        //FROM BUILD
        public ComponentDetailDto? Cpu { get; set; }
        public ComponentDetailDto? Gpu { get; set; }
        public ComponentDetailDto? Ram { get; set; }
        public ComponentDetailDto? Storage { get; set; }
        public ComponentDetailDto? Powersupply { get; set; }
        public ComponentDetailDto? Case { get; set; }
        public ComponentDetailDto? Motherboard { get; set; }
        public ComponentDetailDto? Cpucooler { get; set; }


        public decimal TotalPrice =>
            (Cpu?.Price ?? 0) +
            (Gpu?.Price ?? 0) +
            (Ram?.Price ?? 0) +
            (Storage?.Price ?? 0) +
            (Powersupply?.Price ?? 0) +
            (Case?.Price ?? 0) +
            (Motherboard?.Price ?? 0) +
            (Cpucooler?.Price ?? 0);
    }
}
