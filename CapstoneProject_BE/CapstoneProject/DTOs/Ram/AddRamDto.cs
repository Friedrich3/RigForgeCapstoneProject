namespace CapstoneProject.DTOs.Ram
{
    public class AddRamDto
    {
        public required string Name { get; set; }
        public required int Capacity { get; set; } 
        public required int Modules { get; set; } 
        public required int Speed { get; set; }
        public required string Price { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }
        //FKs
        public required int ManufacturerId { get; set; }
        public required int RamTypeId { get; set; }
    }
}
