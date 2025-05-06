using System.Security.Claims;
using CapstoneProject.DTOs.SharedBuild;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedBuildController : ControllerBase
    {
        private readonly SharedBuildServices _sharedBuildServices;
        public SharedBuildController(SharedBuildServices sharedBuildServices)
        {
            _sharedBuildServices = sharedBuildServices;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddShared([FromQuery] Guid? buildId, [FromForm] AddNewSharedDto newSharedDto)
        {
            try
            {
                //cercare lo userAutenticato
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                if (!buildId.HasValue) { return BadRequest(new { message = "Ops, something with the Ids went wrong!" }); }

                var result = await _sharedBuildServices.AddSharedAsync(email ,buildId, newSharedDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "New Build Successfully shared"
                });
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new {message = ex.Message});
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShared()
        {
            try
            {
                var result = await _sharedBuildServices.GetAllSharedAsync();
                if(result == null)
                    {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                    }
                return Ok(new{
                    data = result,
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("details")]
        public async Task<IActionResult> GetSharedDetail([FromQuery] Guid buildId)
        {
            try
            {
                var result = await _sharedBuildServices.GetSharedDetailAsync(buildId);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    data = result,
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize]    
        [HttpDelete("mybuild")]
        public async Task<IActionResult> DeleteMySharedBuild([FromQuery] Guid id)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;

                var result = await _sharedBuildServices.DeleteMySharedBuildAsync(email, id);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Shared Build removed Successfully!"
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("admin")]
        public async Task<IActionResult> DeleteSharedAsAdmin([FromQuery] Guid id)
        {
            try
            {
                var result = await _sharedBuildServices.DeleteSharedAsAdminAsync(id);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Shared Build removed Successfully!"
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("featured")]
        public async Task<IActionResult> SetAsFeatured([FromQuery] Guid id, [FromBody] bool isFeatured)
        {
            try
            {
                var result = await _sharedBuildServices.SetAsFeaturedAsync(id, isFeatured);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Shared Build added to featured list Successfully!"
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedForHomepage()
        {
            try
            {
                var result = await _sharedBuildServices.GetFeaturedForHomepageAsync();
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new{ data= result });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }




    }
}

