using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public class Case
    {
        [Key]
        public Guid CaseId { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Color { get; set; } = string.Empty;

        public int? FanSupportCount { get; set; } // es: 6 ventole

        public bool? HasGlassPanel { get; set; }

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

        // FK → FormFactor
        [Required]
        public int FormFactorId { get; set; }

        [ForeignKey(nameof(FormFactorId))]
        public FormFactor FormFactor { get; set; }
    }
}
