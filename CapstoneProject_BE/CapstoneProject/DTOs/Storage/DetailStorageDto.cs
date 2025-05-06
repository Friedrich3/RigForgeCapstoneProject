namespace CapstoneProject.DTOs.Storage
{
    public class DetailStorageDto
    {
        public required Guid StorageId { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }

        public int Capacity { get; set; }
        public required string Interface { get; set; }
        public required string  FormFactor { get; set; }
        public bool? NvmeSupport { get; set; }
        public int? ReleaseYear { get; set; }

        public string? Description { get; set; }
        public string? Image { get; set; }

        public required string Manufacturer { get; set; }
        public required string StorageType { get; set; }
    }
}
