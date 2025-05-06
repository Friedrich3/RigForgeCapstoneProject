namespace CapstoneProject.DTOs.Build
{
    public class EditBuildDto
    {
        public required string Name { get; set; }

        public Guid? CpuId { get; set; }
        public Guid? GpuId { get; set; }
        public Guid? RamId { get; set; }
        public Guid? StorageId { get; set; }
        public Guid? PowerSupplyId { get; set; }
        public Guid? CaseId { get; set; }
        public Guid? MotherboardId { get; set; }
        public Guid? CpuCoolerId { get; set; }
    }
}
