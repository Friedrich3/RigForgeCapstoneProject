using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CapstoneProject.Models.Auth;

namespace CapstoneProject.Models
{
    public class SharedBuild
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Guid UserBuildId { get; set; }

        [ForeignKey(nameof(UserBuildId))]
        public UserBuild UserBuild { get; set; }

        public bool IsFeatured { get; set; } = false;    
        public string? Description { get; set; }
        public string? Image {  get; set; }

    }
}
