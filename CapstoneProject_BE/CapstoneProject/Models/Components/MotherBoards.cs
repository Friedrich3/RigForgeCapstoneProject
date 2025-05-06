using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Models.Components
{

    public class Motherboard
    {
        [Key]
        public Guid MotherboardId { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        [Required]
        public int MaxRam { get; set; }

        [Required]
        public int RamSlots { get; set; }


        [Required]
        [StringLength(100)]
        public string Chipset { get; set; } = string.Empty;

        [Required]
        public bool WifiIncluded { get; set; }

        [Required]
        public int PcieSlots { get; set; }

        [Required]
        public int M2Slots { get; set; }

        [Required]
        public int ReleaseYear { get; set; }

        [Required]
        [Precision(8, 2)]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }



        [Required]
        public int RamTypeId { get; set; }
        [ForeignKey(nameof(RamTypeId))]
        public RamType RamType { get; set; }   

        [Required]
        public int ManufacturerId { get; set; }
        [ForeignKey(nameof(ManufacturerId))]
        public Manufacturer Manufacturer { get; set; }

        [Required]
        public int SocketId { get; set; }
        [ForeignKey(nameof(SocketId))]
        public Socket Socket { get; set; }

        // FK → FormFactor
        [Required]
        public int FormFactorId { get; set; }
        [ForeignKey(nameof(FormFactorId))]
        public FormFactor FormFactor { get; set; }
    }

}

