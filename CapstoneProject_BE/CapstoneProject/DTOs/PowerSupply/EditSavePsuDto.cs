namespace CapstoneProject.DTOs.PowerSupply
{
    public class EditSavePsuDto
    {
        public required string Name { get; set; }
        public required int Wattage { get; set; }
        public required string EfficiencyRating { get; set; }
        public bool? Modular { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } = null;
        //Fks
        public required int ManufacturerId { get; set; }
    }
}
