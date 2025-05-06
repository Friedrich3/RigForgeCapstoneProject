using System;
using CapstoneProject.Data;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CpuController : ControllerBase
    {
        private readonly CpuServices _cpuServices;
        public CpuController(CpuServices cpuServices)
        {
            _cpuServices = cpuServices;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> AddNewCpu([FromForm] AddCpuDto addCpuDto)
        {
            try
            {
                var result = await _cpuServices.AddNewAsync(addCpuDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new { message = "Cpu successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> EditSaveCpu([FromQuery] Guid id, [FromForm] EditSaveCpuDto editSaveCpuDto)
        {
            try
            { 
                var result = await _cpuServices.EditSaveAsync(id, editSaveCpuDto);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Cpu successfully edited" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> DeleteCpu([FromQuery] Guid id)
        {
            try
            {
                var result = await _cpuServices.DeleteCpuAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Cpu successfully deleted" });
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
        public async Task<IActionResult> GetAllCpu([FromQuery] CpuQueryParamsDto queryparams)
        //ES di query   /api/Cpu?page=1&pageSize=12&sortBy=releaseYear&sortDir=desc&search=ryzen
        {
            try
            {
                var result = await _cpuServices.GetAllCpuAsync(queryparams);

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
        public async Task<IActionResult> GetCpuDetail([FromQuery]Guid id)
        {                       //  /api/cpu/detail?id={ guid }
            try
            {
                var result = await _cpuServices.GetCpuDetailAsync(id);
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
                var result = await _cpuServices.BackOfficeGetAllAsync();

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
