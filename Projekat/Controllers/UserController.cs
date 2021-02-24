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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("{id}")]
        public ActionResult<User> GetUser(Guid id)
        {
            try
            {
                var user = _userService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
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

        [HttpGet]
        public ActionResult<List<User>> GetUsers()
        {
            try
            {
                var users = _userService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                return Ok(users);
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

        [HttpPut("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingUser == null)
                {
                    return NotFound();
                }

                User user = new User
                {
                    IsDeleted = true,
                    LastName = existingUser.LastName,
                    FirstName = existingUser.FirstName,
                    Email = existingUser.Email,
                    Phone = existingUser.Phone,
                    Role = existingUser.Role,
                    DateOfBirth = existingUser.DateOfBirth,
                    Gender = existingUser.Gender,
                    Id = existingUser.Id
                };

                _userService.UpdateUser(existingUser, user);
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
                var existingUser = _userService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingUser == null)
                {
                    return NotFound();
                }

                User user = new User
                {
                    IsDeleted = false,
                    LastName = existingUser.LastName,
                    FirstName = existingUser.FirstName,
                    Email = existingUser.Email,
                    Phone = existingUser.Phone,
                    Role = existingUser.Role,
                    DateOfBirth = existingUser.DateOfBirth,
                    Gender = existingUser.Gender,
                    Id = existingUser.Id
                };

                _userService.UpdateUser(existingUser, user);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
