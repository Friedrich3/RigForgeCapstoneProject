namespace CapstoneProject.DTOs.SharedBuild
{
    public class SingleShareBuildDto
    {
        public required int Id { get; set; }
        public required Guid UserBuildId { get; set; }
        public required string UserName { get; set; }
        public DateTime? CreatedAt { get; set; }

        public required string Image { get; set; }

        public required string BuildName { get; set; }
        public required string CpuName { get; set; }
        public required string GpuName { get; set; }
        public required string CaseName { get; set; }

        public required decimal TotalPrice { get; set; }

        public bool IsFeatured { get; set; }

    }
}
