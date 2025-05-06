using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public class Ram
    {
        [Key]
        public Guid RamId { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Capacity { get; set; } // Totale GBs per tutti i banchi

        [Required]
        public int Modules { get; set; } // numero di banchi presente

        [Required]
        public int Speed { get; set; } 


        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        public int? ReleaseYear { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? Image { get; set; }

        // FK → Brand
        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }

        // FK → RamType
        [Required]
        public int RamTypeId { get; set; }
        [ForeignKey(nameof(RamTypeId))]
        public RamType RamType { get; set; }
    }
}
