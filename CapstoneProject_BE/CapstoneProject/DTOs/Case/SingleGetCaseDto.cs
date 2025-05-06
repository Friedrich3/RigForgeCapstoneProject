namespace CapstoneProject.DTOs.Case
{
    public class SingleGetCaseDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required string FormFactor { get; set; }
        public bool? HasGlassPanel { get; set; }
        public required string Color { get; set; }
        public int? FanSupportCount { get; set; }

        public string? Image { get; set; }
    }
}
