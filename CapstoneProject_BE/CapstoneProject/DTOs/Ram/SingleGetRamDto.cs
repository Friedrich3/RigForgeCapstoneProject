namespace CapstoneProject.DTOs.Ram
{
    public class SingleGetRamDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }

        public int Capacity { get; set; }
        public int Modules { get; set; }
        public int Speed { get; set; }
        public required string RamType { get; set; }
        public required decimal Price { get; set; }

        public string? Image { get; set; }
    }
}
