using CapstoneProject.Models.Components;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.Models
{
    public class Build
    {
        [Key]
        public Guid BuildId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = "My Custom Build";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }


        public Guid? CpuId { get; set; }
        [ForeignKey(nameof(CpuId))]
        public Cpu? Cpu { get; set; }

        public Guid? GpuId { get; set; }
        [ForeignKey(nameof(GpuId))]
        public Gpu? Gpu { get; set; }

        public Guid? RamId { get; set; }
        [ForeignKey(nameof(RamId))]
        public Ram? Ram { get; set; }

        public Guid? StorageId { get; set; }
        [ForeignKey(nameof(StorageId))]
        public Storage? Storage { get; set; }

        public Guid? PowerSupplyId { get; set; }
        [ForeignKey(nameof(PowerSupplyId))]
        public PowerSupply? PowerSupply { get; set; }

        public Guid? CaseId { get; set; }
        [ForeignKey(nameof(CaseId))]
        public Case? Case { get; set; }

        public Guid? MotherboardId { get; set; }
        [ForeignKey(nameof(MotherboardId))]
        public Motherboard? Motherboard { get; set; }

        public Guid? CpuCoolerId { get; set; }
        [ForeignKey(nameof(CpuCoolerId))]
        public CpuCooler? CpuCooler { get; set; }

        public int? RequiredWattage { get; set; } = 0;

        // Navigation: relazioni utenti
        public ICollection<UserBuild>? UserBuilds { get; set; }

 
    }
}
