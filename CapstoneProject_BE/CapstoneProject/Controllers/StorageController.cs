using CapstoneProject.Data;
using CapstoneProject.DTOs.Storage;
using CapstoneProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CapstoneProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly StorageServices _storageServices;
        public StorageController(StorageServices storageServices)
        {
            _storageServices = storageServices;
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> AddNewStorage([FromForm] AddStorageDto addStorageDto)
        {
            try
            {
                var result = await _storageServices.AddNewAsync(addStorageDto);
                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }
                return Ok(new { message = "Storage device successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Moderator")]
        public async Task<IActionResult> EditSaveStorage([FromQuery] Guid id, [FromForm] EditSaveStorageDto editSaveStorageDto)
        {
            try
            {
                var result = await _storageServices.EditSaveAsync(id, editSaveStorageDto);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Storage device successfully edited" });
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
        public async Task<IActionResult> DeleteStorage([FromQuery] Guid id)
        {
            try
            {
                var result = await _storageServices.DeleteAsync(id);

                if (!result)
                {
                    return BadRequest(new { message = "Ops, something went wrong!" });
                }

                return Ok(new { message = "Storage device successfully deleted" });
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
        public async Task<IActionResult> GetAllStorage([FromQuery] StorageQueryParamsDto queryparams)
        //ES di query   /api/Storage?page=1&pageSize=12&sortBy=releaseYear&sortDir=desc&search=ryzen
        {
            try
            {
                var result = await _storageServices.GetAllStorageAsync(queryparams);

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
        public async Task<IActionResult> GetStorageDetail([FromQuery] Guid id)
        {                       //  /api/storage/detail?id={ guid }
            try
            {
                var result = await _storageServices.GetStorageDetailAsync(id);
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
                var result = await _storageServices.BackOfficeGetAllAsync();

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
