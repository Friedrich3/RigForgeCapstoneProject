namespace CapstoneProject.DTOs.PowerSupply
{
    public class SingleGetPsuDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int Wattage { get; set; }
        public string EfficiencyRating { get; set; } = string.Empty;
        public bool? Modular { get; set; }
        //Fks
        public string? Image { get; set; }
    }
}
