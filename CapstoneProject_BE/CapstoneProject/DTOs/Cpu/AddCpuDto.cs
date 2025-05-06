using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.DTOs.Cpu
{
    public class AddCpuDto
    {
        public required string Name { get; set; }
        public required int Cores { get; set; }
        public required int Threads { get; set; }
        public required string BaseClock { get; set; }
        public required string BoostClock { get; set; }
        public required int Tdp { get; set; }
        public required bool IntegratedGraphics { get; set; }
        public required int ReleaseYear { get; set; }
        public required string Price { get; set; }
        public string? Description { get; set; }
        public required IFormFile Image { get; set; }
        public required int ManufacturerId { get; set; }
        public required int SocketId { get; set; }
    }
}
