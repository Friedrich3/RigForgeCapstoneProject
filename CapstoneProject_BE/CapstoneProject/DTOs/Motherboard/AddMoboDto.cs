namespace CapstoneProject.DTOs.Motherboard
{
    public class AddMoboDto
    {
        public required string Name { get; set; }
        public required int MaxRam { get; set; }
        public required int RamSlots { get; set; }
        public required string Chipset { get; set; }
        public required bool WifiIncluded { get; set; }
        public required int PcieSlots { get; set; }
        public required int M2Slots { get; set; }
        public required int ReleaseYear { get; set; }
        public required string Price { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }

        //FKs
        public required int RamTypeId { get; set; }
        public required int ManufacturerId { get; set; }
        public required int SocketId { get; set; }
        public required int FormFactorId { get; set; }
    }
}
