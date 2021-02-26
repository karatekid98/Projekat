using Projekat.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Requests
{
    public class SignupRequest
    {
        public UserDto UserDto { get; set; }

        public AddressDto AddressDto { get; set; }
    }
}
