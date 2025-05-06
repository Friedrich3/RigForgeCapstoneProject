using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.Models.SupportTables
{
    public class Manufacturer
    {
        [Key]
        public int ManufacturerId { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Categories { get; set; }

    }
}
