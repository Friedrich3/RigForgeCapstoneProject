using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public enum CoolerType
    {
        Air,
        Liquid
    }

    public class CpuCooler
    {
        [Key]
        public Guid CpuCoolerId { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        
        public CoolerType Type { get; set; }

        [Required]
        public int Tdp { get; set; } 

        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? Image { get; set; }

        // FK → Brand
        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }

        // Navigation: compatibilità socket (N:N)
        public ICollection<CpuCoolerSocket>? CpuCoolerSockets { get; set; }
    }
}
