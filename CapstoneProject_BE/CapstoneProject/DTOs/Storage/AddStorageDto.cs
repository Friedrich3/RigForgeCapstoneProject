namespace CapstoneProject.DTOs.Storage
{
    public class AddStorageDto
    {
        public required string Name { get; set; }
        public required int Capacity { get; set; }
        public required string Interface { get; set; }
        public string? FormFactor { get; set; }
        public bool? NvmeSupport { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }
        //FKs
        public required int StorageTypeId { get; set; }
        public required int ManufacturerId { get; set; }
    }
}
