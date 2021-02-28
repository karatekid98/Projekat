using Projekat.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Requests
{
    public class SignupRequest
    {
        [Required]
        public UserDto UserDto { get; set; }
        [Required]
        public AddressDto AddressDto { get; set; }
    }
}
