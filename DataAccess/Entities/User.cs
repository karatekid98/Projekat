using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class User : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email  { get; set; }
        public string Phone { get; set; }
        public bool Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public Guid AddressId { get; set; }

        //ef relationships
        [JsonIgnore]
        [ForeignKey("AddressId")]
        public Address Address { get; set; }
        [JsonIgnore]
        public ICollection<Invoice> Invoices{ get; set; }
    }
}
