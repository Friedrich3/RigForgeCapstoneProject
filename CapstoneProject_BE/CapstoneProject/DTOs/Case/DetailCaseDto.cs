namespace CapstoneProject.DTOs.Case
{
    public class DetailCaseDto
    {
        public required Guid CaseId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public required string Color { get; set; }
        public int? FanSupportCount { get; set; }
        public bool? HasGlassPanel { get; set; }
        public int? ReleaseYear { get; set; }

        public string? Description { get; set; }
        public string? Image { get; set; }

        public required string Manufacturer { get; set; } 
        public required string FormFactor { get; set; }
    }
}
