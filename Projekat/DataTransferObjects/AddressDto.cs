using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.DataTransferObjects
{
    public class AddressDto
    {
        [Required]
        public string City { get; set; }
        [Required]
        public string Line { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Postcode { get; set; }
    }
}
