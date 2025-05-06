using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CapstoneProject.DTOs.Account;
using CapstoneProject.Models.Auth;
using CapstoneProject.Services;
using CapstoneProject.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Jwt _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private readonly BuildServices _buildServices;
        private readonly GoogleAuthServices _googleAuthServices;

        public AccountController(IOptions<Jwt> jwtOptions , UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager , BuildServices buildServices, GoogleAuthServices googleAuthServices)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _buildServices = buildServices;
            _googleAuthServices = googleAuthServices;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {

            if (registerDto == null)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            var newUser = new ApplicationUser()
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                RegisteredAt = DateOnly.FromDateTime(DateTime.Now)
            };
            var result = await _userManager.CreateAsync(newUser, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            var user = await _userManager.FindByEmailAsync(newUser.Email);
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            await _userManager.AddToRoleAsync(user, "User");

            var createResult = await _buildServices.NewBuildAsync(user.Email);
            if (!createResult)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            return Ok(new
            {
                message = "User Signed up successfully",
                reg = true
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, true, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid Email or Password" });
            }
            var roles = await _signInManager.UserManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            //aggiunta di claim personalizzati per catturare meglio i dati nel frontend
            claims.Add(new Claim("email", user.Email));
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim("registeredAt", user.RegisteredAt.ToString("yyyy-MM-dd")));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new TokenResponse()
            {
                Token = tokenString,
                //Expires = expiry,
            });
        }

        [HttpPost("googleAuth")]
        public async Task<IActionResult>GoogleLogin([FromBody] string credential)
        {
            var payload = await _googleAuthServices.VerifyGoogleTokenAsync(credential);
            if (payload == null) { return Unauthorized("Invalid token"); }

            var user = await _userManager.FindByEmailAsync(payload.Email);
            //SE USER NULL FAI IL REGISTER
            var newUser = new ApplicationUser();
            if (user == null)
            {
                var name = payload.GivenName ?? payload.Name;
                var firstName = name.Split(' ')[0];

                newUser.Email = payload.Email;
                newUser.UserName = $"{firstName}-{new Random().Next(10000, 100000)}";
                newUser.RegisteredAt = DateOnly.FromDateTime(DateTime.Now);
                
                var result = await _userManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    return BadRequest(new
                    {
                        message = "Ops, something went wrong!"
                    });
                }
                user = newUser;
                await _userManager.AddToRoleAsync(user, "User");
                var createResult = await _buildServices.NewBuildAsync(user.Email);
                if (!createResult)
                {
                    return BadRequest(new
                    {
                        message = "Ops, something went wrong!"
                    });
                }
            }
            //SE LO USER E' O NON e' PRESENTE FAI COMUNQUEIL LOGIN
            var roles = await _signInManager.UserManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            //aggiunta di claim personalizzati per catturare meglio i dati nel frontend
            claims.Add(new Claim("email", user.Email));
            claims.Add(new Claim("username", user.UserName));
            claims.Add(new Claim("registeredAt", user.RegisteredAt.ToString("yyyy-MM-dd")));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new TokenResponse()
            {
                Token = tokenString,
                //Expires = expiry,
            });
        }

        //not implemented yet Frontend, needs migration on database to add the AuthProvide, if it's from google return BadRequest
        [Authorize]
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if (changePasswordDto == null)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
            if (string.IsNullOrEmpty(email)) return Unauthorized();
            var user = await _userManager.FindByNameAsync(email);
            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Ops, something went wrong!"
                });
            }
            else
            {
                return Ok(new
                {
                    message = "Password changed correctly"
                });
            }
        }

    }
}
