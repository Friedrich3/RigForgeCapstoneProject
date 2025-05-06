namespace CapstoneProject.DTOs.Build
{
    public class SingleUserBuildDto
    {
        public required Guid BuildId { get; set; }
        public required string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }

        public bool IsActive { get; set; }
        public bool IsShared { get; set; }

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
