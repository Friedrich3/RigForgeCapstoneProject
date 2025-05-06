using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public class Gpu
    {
        [Key]
        public Guid GpuId { get; set; }

        [Required]
        [StringLength(150)]
        public required string Name { get; set; }
        [Required]
        [StringLength(100)]
        public required string Chipset { get; set; }

        [Required]
        public int Vram { get; set; } // in GB

        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        [Required]
        public int Tdp { get; set; } // in Watt

        [Required]
        [StringLength(10)]
        public string PcieVersion { get; set; } = "4.0"; // es: "3.0", "4.0", "5.0"


        public int? ReleaseYear { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? Image { get; set; }

        // FK → Brand
        [Required]
        public int ManufacturerId { get; set; }

        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }
    }
}
