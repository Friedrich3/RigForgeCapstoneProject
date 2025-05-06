using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CapstoneProject.Models.SupportTables;
using Microsoft.EntityFrameworkCore;

namespace CapstoneProject.Models.Components
{
    public class Cpu
    {
        [Key]
        public Guid CpuId { get; set; }

        [Required]
        [StringLength(150)]
        public required string Name { get; set; }

        [Required]
        public int Cores { get; set; }

        [Required]
        public int Threads { get; set; }

        [Required]
        [Precision(5, 2)]
        public decimal BaseClock { get; set; }

        [Required]
        [Precision(5, 2)]
        public decimal BoostClock { get; set; }

        [Required]
        public int Tdp { get; set; }

        [Required]
        public bool IntegratedGraphics { get; set; }

        [Required]
        public int ReleaseYear { get; set; }

        [Required]
        [Precision(8,2)]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }

        [Required]
        public int SocketId { get; set; }
        [ForeignKey(nameof(SocketId))]
        public Socket Socket { get; set; }

    }
}
