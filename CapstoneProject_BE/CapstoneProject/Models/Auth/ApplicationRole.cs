using Microsoft.AspNetCore.Identity;

namespace CapstoneProject.Models.Auth
{
    public class ApplicationRole : IdentityRole
    {

        public ICollection<ApplicationUserRole> ApplicationUserRole { get; set; }
    }
}
