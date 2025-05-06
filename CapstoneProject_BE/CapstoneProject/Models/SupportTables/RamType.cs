using CapstoneProject.Models.Components;
using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.Models.SupportTables
{
    public class RamType
    {
        [Key]
        public int RamTypeId { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; } = string.Empty;  // es: DDR3, DDR4, DDR5

        public ICollection<Ram>? Rams { get; set; }
        public ICollection<Motherboard>? Motherboards { get; set; }
    }

}
