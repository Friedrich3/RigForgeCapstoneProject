using CapstoneProject.Models.Components;
using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.Models.SupportTables
{
    public class FormFactor
    {
        [Key]
        public int FormFactorId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;  // es: ATX, Micro-ATX, Mini-ITX

        [MaxLength(200)]
        public string? Description { get; set; }

        // Navigation properties
        public ICollection<Motherboard>? Motherboards { get; set; }
        public ICollection<Case>? Cases { get; set; }
    }
}
