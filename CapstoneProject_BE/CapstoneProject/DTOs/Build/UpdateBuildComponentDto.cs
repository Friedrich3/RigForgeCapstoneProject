namespace CapstoneProject.DTOs.Build
{
    public class UpdateBuildComponentDto
    {
        public required Guid ComponentId { get; set; }
        public required string ComponentType { get; set; } //SARANNO i vari componenti "cpu" - "gpu" - "mobo"
    }
}
