using System.ComponentModel.DataAnnotations;

namespace CapstoneProject.DTOs.Account
{
    public class RegisterDto
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        [Compare(nameof(Password))]
        public required string ConfirmPassword { get; set; }
    }
}
