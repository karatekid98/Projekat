using Contracts.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Projekat.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class ShipmentController : ControllerBase
    {
        private readonly IShipmentService _shipmentService;

        public ShipmentController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }



        [HttpGet("{id}")]
        public ActionResult<Shipment> GetShipment(Guid id)
        {
            try
            {
                var shipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
                if (shipment == null)
                {
                    return NotFound();
                }
                return Ok(shipment);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpGet]
        public ActionResult<PagedList<Shipment>> GetShipments([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var shipments = _shipmentService.AsQueryable().Where(x => x.IsDeleted == false);

                var pagedShipments= PagedList<Shipment>.ToPagedList(shipments, parameters.PageNumber, parameters.PageSize);

                var metadata = new
                {
                    pagedShipments.PageSize,
                    pagedShipments.TotalCount,
                    pagedShipments.CurrentPage,
                    pagedShipments.TotalPages,
                    pagedShipments.HasNext,
                    pagedShipments.HasPrevious
                };

                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

                return Ok(pagedShipments);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult AddShipment([FromBody] Shipment shipment)
        {
            try
            {
                _shipmentService.AddShipment(shipment);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpPut("{id}")]
        public ActionResult UpdateShipment(Guid id, [FromBody] Shipment newShipment)
        {
            try
            {

                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingShipment == null)
                {
                    return NotFound();
                }

                _shipmentService.UpdateShipment(existingShipment, newShipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteShipment(Guid id)
        {
            try
            {
                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingShipment == null)
                {
                    return NotFound();
                }

                _shipmentService.RemoveShipment(existingShipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPatch("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingShipment == null)
                {
                    return NotFound();
                }

           
                _shipmentService.SoftDelete(existingShipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPatch("undoDelete/{id}")]
        public ActionResult UndoDelete(Guid id)
        {
            try
            {
                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingShipment == null)
                {
                    return NotFound();
                }

                _shipmentService.UndoDelete(existingShipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
