namespace CapstoneProject.DTOs.Ram
{
    public class EditSaveRamDto
    {
        public required string Name { get; set; }
        public required int Capacity { get; set; }
        public required int Modules { get; set; }
        public required int Speed { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public IFormFile? Image { get; set; } =null;
        //Fks
        public required int ManufacturerId { get; set; }
        public required int RamTypeId { get; set; }
    }
}
