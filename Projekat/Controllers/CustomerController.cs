using Contracts.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Projekat.Pagination;
using Projekat.Requests;
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
        private readonly IAddressService _addressService;

        public CustomerController(ICustomerService customerService, IAddressService addressService)
        {
            _customerService = customerService;
            _addressService = addressService;
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(Guid id)
        {
            try
            {
                var customer = _customerService.AsQueryable().FirstOrDefault(x => x.Id == id);

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
        public ActionResult<PaginationResponse<Customer>> GetCustomers([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var customers = _customerService.AsQueryable().Where(x => x.IsDeleted == false);

                var pagedCustomers= PagedList<Customer>.ToPagedList(customers, parameters.PageNumber, parameters.PageSize);
                
                var paginationResponse = PagedList<Customer>.ToPaginationResponse(pagedCustomers);

                return Ok(paginationResponse);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpGet("getAllCustomers")]
        public ActionResult<Customer> GetCustomersNoPag()
        {

            try
            {
                var customers= _customerService.AsQueryable().Where(x => x.IsDeleted == false);

                return Ok(customers);
            }
            catch (Exception e)
            {

                return BadRequest(e.GetBaseException().Message);
            }

        }


        [HttpGet("getDeletedCustomers")]
        public ActionResult<PaginationResponse<Customer>> GetDeletedCustomers([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var deletedCustomers= _customerService.AsQueryable().Where(x => x.IsDeleted == true);

                var pagedDeletedCustomers= PagedList<Customer>.ToPagedList(deletedCustomers, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<Customer>.ToPaginationResponse(pagedDeletedCustomers);

                return Ok(paginationResponse);

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

        [HttpPost("singUp")]
        public ActionResult Signup([FromBody] SingupCustomerRequest signupCustomerRequest)
        {
            try
            {
                var customer = new Customer();
                var address = new Address();
                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.City == signupCustomerRequest.AddressDto.City &&
                x.Country == signupCustomerRequest.AddressDto.Country &&
                x.Line == signupCustomerRequest.AddressDto.Line &&
                x.Postcode == signupCustomerRequest.AddressDto.Postcode);

                if (existingAddress == null)
                {
                    address.City = signupCustomerRequest.AddressDto.City;
                    address.Country = signupCustomerRequest.AddressDto.Country;
                    address.Line = signupCustomerRequest.AddressDto.Line;
                    address.Postcode = signupCustomerRequest.AddressDto.Postcode;

                    _addressService.AddAddress(address);
                    customer.AddressId = address.Id;
                }
                else
                {
                    customer.AddressId = existingAddress.Id;
                }

                var existingUser = _customerService.AsQueryable().FirstOrDefault(x => x.Email == signupCustomerRequest.CustomerDto.Email);

                if (existingUser != null)
                {
                    return Ok(false);
                }

                MapRequestToCustomer(signupCustomerRequest, customer);

                _customerService.AddCustomer(customer);

                return Ok(true);
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

        private void MapRequestToCustomer(SingupCustomerRequest signupCustomerRequest, Customer customer)
        {
     
            customer.Email = signupCustomerRequest.CustomerDto.Email;
            customer.FirstName = signupCustomerRequest.CustomerDto.FirstName;
            customer.LastName = signupCustomerRequest.CustomerDto.LastName;
            customer.Name = signupCustomerRequest.CustomerDto.Name;
            customer.Phone = signupCustomerRequest.CustomerDto.Phone;
            customer.Gender = signupCustomerRequest.CustomerDto.Gender;
            customer.CompanyNumber = signupCustomerRequest.CustomerDto.CompanyNumber;


        }

    }
}
