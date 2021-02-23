﻿using Contracts.Services;
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
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }


        [HttpGet("{id}")]
        public ActionResult<Address> GetAddress(Guid id)
        {
            try
            {
                var address = _addressService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
                if (address == null)
                {
                    return NotFound();
                }
                return Ok(address);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpGet]
        public ActionResult<List<Address>> GetAddresses()
        {
            try
            {
                var addresses = _addressService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                return Ok(addresses);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult AddAddress([FromBody] Address address)
        {
            try
            {
                _addressService.AddAddress(address);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpPut("{id}")]
        public ActionResult UpdateAddress(Guid id, [FromBody] Address newAddress)
        {
            try
            {

                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingAddress == null)
                {
                    return NotFound();
                }

                _addressService.UpdateAddress(existingAddress, newAddress);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteAddress(Guid id)
        {
            try
            {
                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingAddress == null)
                {
                    return NotFound();
                }

                _addressService.RemoveAddress(existingAddress);
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
                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingAddress == null)
                {
                    return NotFound();
                }

                Address address = new Address
                {
                    IsDeleted = true,
                    City = existingAddress.City,
                    Line = existingAddress.Line,
                    Country = existingAddress.Country,
                    Postcode = existingAddress.Postcode,
                    Id = existingAddress.Id
                };

                _addressService.UpdateAddress(existingAddress, address);
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
                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingAddress == null)
                {
                    return NotFound();
                }

                Address address = new Address
                {
                    IsDeleted = false,
                    City = existingAddress.City,
                    Line = existingAddress.Line,
                    Country = existingAddress.Country,
                    Postcode = existingAddress.Postcode,
                    Id = existingAddress.Id
                };

                _addressService.UpdateAddress(existingAddress, address);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


    }
}
