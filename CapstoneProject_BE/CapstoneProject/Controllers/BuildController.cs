using System.Security.Claims;
using CapstoneProject.DTOs.Build;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildController : ControllerBase
    {
        private readonly BuildServices _buildServices;
        public BuildController(BuildServices buildServices)
        {
            _buildServices = buildServices;
        }


        [Authorize]
        [HttpPost("new")]
        public async Task<IActionResult> NewBuild()
        {
            try
            {
                //cercare lo userAutenticato
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.NewBuildAsync(email);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "New Build Successfully created"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetActiveBuild()
        {
            try
            {
                //cercare lo userAutenticato
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.GetActiveBuildAsync(email);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build Successfully retrived",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPut("editComp")]
        //TO ADD A SINGLE COMPONENT TO THE ENTIRE BUILD LIST
        public async Task<IActionResult> EditSingleComponent([FromBody] UpdateBuildComponentDto updateBuildComponentDto)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.EditSingleComponentAsync(email, updateBuildComponentDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Component Successfully added",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{comp}")]
        public async Task<IActionResult> RemoveSingleComp(string comp)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.RemoveSingleComponentAsync(email, comp);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Component Successfully removed",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize]
        [HttpPut("reset")]
        public async Task<IActionResult> ResetBuild()
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.ResetBuildAsync(email);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build Successfully resetted",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllUserBuild()
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.GetAllBuildAsync(email);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    data = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUserBuild([FromQuery] string id)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.RemoveBuildAsync(email, id);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build Successfully removed",
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPut("editname")]
        public async Task<IActionResult> RenameBuild([FromQuery] string id, [FromBody] string name)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.RenameBuildAsync(email, id, name);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build name Successfully changed ",
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPut("setactive")]
        public async Task<IActionResult> SetBuildToActive([FromQuery] string id)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.SetBuildToActiveAsync(email, id);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build name Successfully changed ",
                });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("clone")]
        public async Task<IActionResult> CloneBuild([FromQuery] Guid buildId)
        {
            try
            {
                var email = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.Email).Value;
                var result = await _buildServices.CloneBuildAsync(email, buildId);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new
                {
                    message = "Build Successfully Cloned"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }







    }
}
