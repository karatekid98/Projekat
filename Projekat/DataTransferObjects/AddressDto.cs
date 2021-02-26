using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.DataTransferObjects
{
    public class AddressDto
    {
        public string City { get; set; }
        public string Line { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }
    }
}
