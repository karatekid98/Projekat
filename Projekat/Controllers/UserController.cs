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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAddressService _addressService;
        private readonly IInvoiceService _invoiceService;

        public UserController(IUserService userService, IAddressService addressService, IInvoiceService invoiceService)
        {
            _userService = userService;
            _addressService = addressService;
            _invoiceService = invoiceService;
        }


        [HttpGet("{id}")]
        public ActionResult<User> GetUser(Guid id)
        {
            try
            {
                // obrisano iz uslova && x.IsDeleted == false zbog invoice-a ovde i kod customer controller-a
                var user = _userService.AsQueryable().FirstOrDefault(x => x.Id == id);
                var invoicesResponse = _invoiceService.AsQueryable().Where(x => x.IssuerId == id);

             
                if (user == null)
                {
                    return NotFound();
                }
           
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }


        [HttpGet("getUserAddress/{id}")]
        public ActionResult<Address> GetUserAddress(Guid id)
        {
            try
            {
                var address = _addressService.AsQueryable().Where(x => x.Id == id);


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

        [HttpGet("getUserInvoices/{id}")]
        public ActionResult<Invoice> GetUserInvoices(Guid id)
        {
            try
            {
                var invoicesResponse = _invoiceService.AsQueryable().Where(x => x.IssuerId == id);


                if (invoicesResponse == null)
                {
                    return NotFound();
                }

                return Ok(invoicesResponse);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet]
        public ActionResult<PaginationResponse<User>> GetUsers([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var users = _userService.AsQueryable().Where(x => x.IsDeleted == false).OrderBy(x => x.FirstName);

                var pagedUsers = PagedList<User>.ToPagedList(users, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<User>.ToPaginationResponse(pagedUsers);

                return Ok(paginationResponse);
            }
            catch (Exception e)
            {

                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpGet("getDeletedUsers")]
        public ActionResult<PaginationResponse<User>> GetDeletedUsers([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var deletedUsers = _userService.AsQueryable().Where(x => x.IsDeleted == true);

                var pagedDeletedUsers = PagedList<User>.ToPagedList(deletedUsers, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<User>.ToPaginationResponse(pagedDeletedUsers);

                return Ok(paginationResponse);
 
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult AddUser([FromBody] User user)
        {
            try
            {
                _userService.AddUser(user);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("addUsers")]
        public ActionResult AddUsers([FromBody] List<User> users)
        {
            try
            {
                foreach (var user in users)
                {
                    _userService.AddUser(user);
                }

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpPut("{id}")]
        public ActionResult UpdateUser(Guid id, [FromBody] User newUser)
        {
            try
            {

                var existingUser= _userService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingUser == null)
                {
                    return NotFound();
                }

                _userService.UpdateUser(existingUser, newUser);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteUser(Guid id)
        {
            try
            {
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingUser == null)
                {
                    return NotFound();
                }

                _userService.RemoveUser(existingUser);
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
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingUser == null)
                {
                    return NotFound();
                }

                _userService.SoftDelete(existingUser);
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
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingUser == null)
                {
                    return NotFound();
                }

                _userService.UndoDelete(existingUser);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("singUp")]
        public ActionResult Signup([FromBody] SignupRequest signupRequest)
        {
            try
            {
                var user = new User();
                var address = new Address();
                var existingAddress = _addressService.AsQueryable().FirstOrDefault(x => x.City == signupRequest.AddressDto.City &&
                x.Country == signupRequest.AddressDto.Country &&
                x.Line == signupRequest.AddressDto.Line &&
                x.Postcode == signupRequest.AddressDto.Postcode);

                if (existingAddress == null)
                {
                    address.City = signupRequest.AddressDto.City;
                    address.Country = signupRequest.AddressDto.Country;
                    address.Line = signupRequest.AddressDto.Line;
                    address.Postcode = signupRequest.AddressDto.Postcode;

                    _addressService.AddAddress(address);
                    user.AddressId = address.Id;
                }
                else
                {
                    user.AddressId = existingAddress.Id;
                }

                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Email == signupRequest.UserDto.Email);

                if (existingUser != null)
                {
                    return Ok(false);
                }

                MapRequestToUser(signupRequest, user);

                _userService.AddUser(user);

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }



        // ukoliko dobijem null, user ne postoji, u suprotnom postoji i vraca celog User-a u responsu
        [HttpPost("logIn")]
        public ActionResult<User> Login([FromBody] LoginRequest loginRequest) 
        {
            try
            {
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Email == loginRequest.Email && x.Password == loginRequest.Password);

                if (existingUser == null)
                {
                    return Ok(null);
                }

                return Ok(existingUser);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
          
        }

        private void MapRequestToUser(SignupRequest signupRequest, User user)
        {
            user.DateOfBirth = signupRequest.UserDto.DateOfBirth;
            user.Email = signupRequest.UserDto.Email;
            user.FirstName = signupRequest.UserDto.FirstName;
            user.LastName = signupRequest.UserDto.LastName;
            user.Phone = signupRequest.UserDto.Phone;
            user.Gender = signupRequest.UserDto.Gender;
            user.Password = signupRequest.UserDto.Password;
            user.Role = false;
        }

    }
}
