namespace CapstoneProject.DTOs.PowerSupply
{
    public class DetailPsuDto
    {
        public required Guid PowerSupplyId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int Wattage { get; set; }
        public required string EfficiencyRating { get; set; } 
        public bool? Modular { get; set; }

        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }

        public required string Manufacturer { get; set; } 
    }
}
