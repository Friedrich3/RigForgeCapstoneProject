namespace CapstoneProject.DTOs.Storage
{
    public class EditSaveStorageDto
    {
        public required string Name { get; set; }
        public required int Capacity { get; set; }
        public required string Interface { get; set; }
        public string? FormFactor { get; set; }
        public bool? NvmeSupport { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } = null;
        //Fks
        public required int StorageTypeId { get; set; }
        public required int ManufacturerId { get; set; }
    }
}
