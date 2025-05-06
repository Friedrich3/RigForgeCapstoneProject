using CapstoneProject.Data;
using CapstoneProject.DTOs.Gpu;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GpuController : ControllerBase
    {
        private readonly GpuServices _gpuServices;
        public GpuController(GpuServices gpuServices)
        {
            _gpuServices = gpuServices;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> AddNewGpu([FromForm] AddGpuDto addGpuDto)
        {
            try
            {
                var result = await _gpuServices.AddNewAsync(addGpuDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new { message = "Graphic Card successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> EditSaveGpu([FromQuery] Guid id, [FromForm] EditSaveGpuDto editSaveGpuDto)
        {
            try
            {
                var result = await _gpuServices.EditSaveAsync(id, editSaveGpuDto);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Graphic Card successfully edited" });
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
        public async Task<IActionResult> DeleteGpu([FromQuery] Guid id)
        {
            try
            {
                var result = await _gpuServices.DeleteAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Graphic Card successfully deleted" });
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
        public async Task<IActionResult> GetAllGpu([FromQuery] GpuQueryParamsDto queryparams)
        //ES di query   /api/Gpu?page=1&pageSize=12&sortBy=releaseYear&sortDir=desc&search=ryzen
        {
            try
            {
                var result = await _gpuServices.GetAllGpuAsync(queryparams);

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
        public async Task<IActionResult> GetGpuDetail([FromQuery] Guid id)
        {                       //  /api/gpu/detail?id={ guid }
            try
            {
                var result = await _gpuServices.GetGpuDetailAsync(id);
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
                var result = await _gpuServices.BackOfficeGetAllAsync();

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
