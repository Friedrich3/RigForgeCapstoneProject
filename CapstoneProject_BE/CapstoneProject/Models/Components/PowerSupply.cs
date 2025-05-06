using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public class PowerSupply
    {
        [Key]
        public Guid PowerSupplyId { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int Wattage { get; set; }

        [Required]
        [StringLength(20)]
        public string EfficiencyRating { get; set; } = string.Empty; // es: 80+ Gold

        public bool? Modular { get; set; } // true = full, false = non, null = semi

        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        public int? ReleaseYear { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? Image { get; set; }

        // FK → Manufacturer
        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }
    }
}
