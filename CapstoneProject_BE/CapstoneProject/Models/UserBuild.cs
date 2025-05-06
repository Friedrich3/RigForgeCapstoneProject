using CapstoneProject.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace CapstoneProject.Models
{
    public class UserBuild
    {
        [Key]
        public Guid UserBuildId { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        [Required]
        public Guid BuildId { get; set; }

        [ForeignKey(nameof(BuildId))]
        public Build Build { get; set; }

        public DateTime LastModified { get; set; } = DateTime.UtcNow;

        public bool IsCurrent { get; set; } = false;

        public SharedBuild SharedBuild { get; set; }
    }
}
