using CapstoneProject.Data;
using CapstoneProject.DTOs.Ram;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RamController : ControllerBase
    {
        private readonly RamServices _ramServices;
        public RamController(RamServices ramServices)
        {
            _ramServices = ramServices;
        }
        [HttpPost]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> AddNewRam([FromForm] AddRamDto addRamDto)
        {
            try
            {
                var result = await _ramServices.AddNewAsync(addRamDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new { message = "RAMs successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> EditSaveRam([FromQuery] Guid id, [FromForm] EditSaveRamDto editSaveRamDto)
        {
            try
            {
                var result = await _ramServices.EditSaveAsync(id, editSaveRamDto);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "RAMs successfully edited" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> DeleteRam([FromQuery] Guid id)
        {
            try
            {
                var result = await _ramServices.DeleteAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "RAMs successfully deleted" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRam([FromQuery] RamQueryParamsDto queryparams)
        //ES di query   /api/Ram?page=1&pageSize=12&sortBy=releaseYear&sortDir=desc&search=ryzen
        {
            try
            {
                var result = await _ramServices.GetAllRamAsync(queryparams);

                if (result.Items == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("detail")]
        public async Task<IActionResult> GetRamDetail([FromQuery] Guid id)
        {                       //  /api/ram/detail?id={ guid }
            try
            {
                var result = await _ramServices.GetRamDetailAsync(id);
                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("backoffice")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BackOfficeGetAll()
        {
            try
            {
                var result = await _ramServices.BackOfficeGetAllAsync();

                if (result == null)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }











    }
}
