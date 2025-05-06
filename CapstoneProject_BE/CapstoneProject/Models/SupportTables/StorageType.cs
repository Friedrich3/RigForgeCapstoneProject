using CapstoneProject.Models.Components;
using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.Models.SupportTables
{
    public class StorageType
    {
        [Key]
        public int StorageTypeId { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; } = string.Empty;  // es: SSD, HDD

        public ICollection<Storage>? Storages { get; set; }
    }
}
