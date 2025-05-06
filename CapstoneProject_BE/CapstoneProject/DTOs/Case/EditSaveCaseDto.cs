namespace CapstoneProject.DTOs.Case
{
    public class EditSaveCaseDto
    {
        public required string Name { get; set; }
        public required string Color { get; set; }
        public int? FanSupportCount { get; set; }
        public bool? HasGlassPanel { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } = null;
        //Fks
        public required int ManufacturerId { get; set; }
        public required int FormFactorId { get; set; }
    }
}
