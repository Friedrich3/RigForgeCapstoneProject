using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{
    public class Storage
    {
        [Key]
        public Guid StorageId { get; set; }

        [Required]
        [StringLength(150)]
        public required string Name { get; set; } 

        [Required]
        public int Capacity { get; set; } // in GB

        [Required]
        [StringLength(20)]
        public string Interface { get; set; } = string.Empty; // es: SATA, NVMe, PCIe

        [StringLength(20)]
        public string? FormFactor { get; set; } // es: 2.5", M.2

        public bool? NvmeSupport { get; set; }

        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        public int? ReleaseYear { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public string? Image { get; set; }

        // FK -> StorageType
        [Required]
        public int StorageTypeId { get; set; }
        [ForeignKey(nameof(StorageTypeId))]
        public StorageType StorageType { get; set; }

        // FK → Brand
        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }
    }
}
