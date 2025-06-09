using Microsoft.AspNetCore.Identity;

namespace CapstoneProject.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public DateOnly RegisteredAt { get; set; }
        public bool GoogleAccount { get; set; } = false;
        public ICollection<ApplicationUserRole> ApplicationUserRole { get; set; }
        public ICollection<UserBuild>? UserBuilds { get; set; }
    }
}
