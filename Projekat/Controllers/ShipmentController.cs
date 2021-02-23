using Contracts.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<List<Shipment>> GetShipments()
        {
            try
            {
                var shipment = _shipmentService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                return Ok(shipment);
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

        [HttpPut("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingShipment == null)
                {
                    return NotFound();
                }

                Shipment shipment = new Shipment
                {
                    IsDeleted = true,
                    DateOfShipment = existingShipment.DateOfShipment,
                    Id = existingShipment.Id
                };

                _shipmentService.UpdateShipment(existingShipment, shipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPut("undoDelete/{id}")]
        public ActionResult UndoDelete(Guid id)
        {
            try
            {
                var existingShipment = _shipmentService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingShipment == null)
                {
                    return NotFound();
                }


                Shipment shipment = new Shipment
                {
                    IsDeleted = false,
                    DateOfShipment = existingShipment.DateOfShipment,
                    Id = existingShipment.Id
                };

                _shipmentService.UpdateShipment(existingShipment, shipment);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
