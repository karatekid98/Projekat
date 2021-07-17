using Projekat.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace Projekat.Requests
{
    public class SingupCustomerRequest
    {
        [Required]
        public CustomerDto CustomerDto { get; set; }
        [Required]
        public AddressDto AddressDto { get; set; }
    }

       

}
