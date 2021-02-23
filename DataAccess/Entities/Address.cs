using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class Address : EntityBase
    {
        public string City { get; set; }
        public string Line { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }


        // ef relationship
        [JsonIgnore]
        public ICollection<User> Users { get; set; }
        [JsonIgnore]
        public ICollection<Customer> Customers { get; set; }
    }
}
