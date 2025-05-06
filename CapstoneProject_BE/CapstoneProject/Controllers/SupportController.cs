using CapstoneProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly SupportServices _supportServices;
        public SupportController(SupportServices supportServices)
        {
            _supportServices = supportServices;
        }

        [HttpGet("manufacturers")]
        public async Task<IActionResult> GetAllManufacturers([FromQuery] string? category)
        {
            try
            {
                var result = await _supportServices.GetAllManufacturersAsync(category);

                if (result.Count < 1)
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
        [HttpGet("socket")]
        public async Task<IActionResult> GetAllSocket()
        {
            try
            {
                var result = await _supportServices.GetAllSocketAsync();

                if (result.Count < 1)
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
        [HttpGet("formfactor")]
        public async Task<IActionResult> GetAllFormFactor()
        {
            try
            {
                var result = await _supportServices.GetAllFormFactorAsync();

                if (result.Count < 1)
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
        [HttpGet("ramtype")]
        public async Task<IActionResult> GetAllRamType()
        {
            try
            {
                var result = await _supportServices.GetAllRamTypeAsync();

                if (result.Count < 1)
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
        [HttpGet("storagetype")]
        public async Task<IActionResult> GetAllStorageType()
        {
            try
            {
                var result = await _supportServices.GetAllStorageTypeAsync();

                if (result.Count < 1)
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
