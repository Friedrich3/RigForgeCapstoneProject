using CapstoneProject.DTOs.Case;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly CaseServices _caseServices;
        public CaseController(CaseServices caseServices)
        {
            _caseServices = caseServices;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> AddNewCase([FromForm] AddCaseDto addCaseDto)
        {
            try
            {
                var result = await _caseServices.AddNewAsync(addCaseDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new { message = "Case successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> EditSaveCase([FromQuery] Guid id, [FromForm] EditSaveCaseDto editSaveCaseDto)
        {
            try
            {
                var result = await _caseServices.EditSaveAsync(id, editSaveCaseDto);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Case successfully edited" });
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
        public async Task<IActionResult> DeleteCase([FromQuery] Guid id)
        {
            try
            {
                var result = await _caseServices.DeleteAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Case successfully deleted" });
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
        public async Task<IActionResult> GetAllCase([FromQuery] CaseQueryParamsDto queryparams)
        //ES di query   /api/Case?page=1&pageSize=12&sortBy=releaseYear&sortDir=desc&search=ryzen
        {
            try
            {
                var result = await _caseServices.GetAllCaseAsync(queryparams);

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
        public async Task<IActionResult> GetCaseDetail([FromQuery] Guid id)
        {                       //  /api/case/detail?id={ guid }
            try
            {
                var result = await _caseServices.GetCaseDetailAsync(id);
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
                var result = await _caseServices.BackOfficeGetAllAsync();

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
