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
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(Guid id)
        {
            try
            {
                var customer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (customer == null)
                {
                    return NotFound();
                }
                return Ok(customer);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        
        }

        [HttpGet]
        public ActionResult<List<Customer>> GetCustomers()
        {
            try
            {
                var customers = _customerService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                return Ok(customers);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost]
        public ActionResult AddCustomer([FromBody] Customer customer)
        {
            try
            {
                _customerService.AddCustomer(customer);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult UpdateCustomer(Guid id, [FromBody] Customer newCustomer)
        {
            try
            {
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                _customerService.UpdateCustomer(existingCustomer, newCustomer);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteCustomer(Guid id)
        {
            try
            {
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                _customerService.RemoveCustomer(existingCustomer);
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
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                Customer customer = new Customer
                {
                    IsDeleted = true,
                    Name = existingCustomer.Name,
                    Email = existingCustomer.Email,
                    Phone = existingCustomer.Phone,
                    CompanyNumber = existingCustomer.CompanyNumber,
                    AddressId = existingCustomer.AddressId,
                    Id = existingCustomer.Id
                };

                _customerService.UpdateCustomer(existingCustomer, customer);
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
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                Customer customer = new Customer
                {
                    IsDeleted = false,
                    Name = existingCustomer.Name,
                    Email = existingCustomer.Email,
                    Phone = existingCustomer.Phone,
                    CompanyNumber = existingCustomer.CompanyNumber,
                    AddressId = existingCustomer.AddressId,
                    Id = existingCustomer.Id
                };

                _customerService.UpdateCustomer(existingCustomer, customer);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


    }
}
