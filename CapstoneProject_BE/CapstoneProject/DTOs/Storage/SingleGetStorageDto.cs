namespace CapstoneProject.DTOs.Storage
{
    public class SingleGetStorageDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int Capacity { get; set; } // in GB
        public required string Interface { get; set; }
        public required string? FormFactor { get; set; }

        public string? Image { get; set; }
        public required string StorageType { get; set; } 
    }
}
