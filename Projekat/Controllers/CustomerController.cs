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
        public ActionResult<PagedList<Customer>> GetCustomers([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var customers = _customerService.AsQueryable().Where(x => x.IsDeleted == false);

                var pagedCustomers= PagedList<Customer>.ToPagedList(customers, parameters.PageNumber, parameters.PageSize);

                var metadata = new
                {
                    pagedCustomers.PageSize,
                    pagedCustomers.TotalCount,
                    pagedCustomers.CurrentPage,
                    pagedCustomers.TotalPages,
                    pagedCustomers.HasNext,
                    pagedCustomers.HasPrevious
                };

                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
                return Ok(pagedCustomers);
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

        [HttpPost("addCustomers")]
        public ActionResult AddCustomers([FromBody] List<Customer> customers)
        {
            try
            {
                foreach (var customer in customers)
                {
                    _customerService.AddCustomer(customer);
                }
              
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

        [HttpPatch("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingCustomer == null)
                {
                    return NotFound();
                }


                _customerService.SoftDelete(existingCustomer);
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
                var existingCustomer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                _customerService.UndoDelete(existingCustomer);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


    }
}
