using Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using Projekat.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LockController : ControllerBase
    {
        
        private readonly ILockService _lockService;

        public LockController(ILockService lockService)
        {
            _lockService = lockService;
        }


        [HttpPost("lockItem")]
        public ActionResult LockItem([FromBody] LockRequest lockRequest)
        {
            try
            {
                _lockService.Lock(lockRequest.ItemId, lockRequest.UserId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }  
        }

        [HttpPost("unlockItem/{itemId}")]
        public ActionResult UnlockItem(Guid itemId)
        {
            try
            {
                _lockService.Unlock(itemId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpGet("isItemLocked/{itemId}")]
        public ActionResult<bool> IsItemLocked(Guid itemId)
        {
            try
            {
                return Ok(_lockService.IsItemLocked(itemId));
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
