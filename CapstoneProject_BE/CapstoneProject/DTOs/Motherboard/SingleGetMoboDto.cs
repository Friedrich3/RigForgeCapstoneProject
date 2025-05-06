namespace CapstoneProject.DTOs.Motherboard
{
    public class SingleGetMoboDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Socket { get; set; }
        public required int MaxRam { get; set; }
        public required int RamSlots { get; set; }
        public required string RamType { get; set; }
        public required string FormFactor { get; set; }

        public required decimal Price { get; set; }
        public string? Image { get; set; }
    }
}
