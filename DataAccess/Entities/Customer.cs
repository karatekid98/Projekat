using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class Customer : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public Guid AddressId { get; set; }
        public string CompanyNumber { get; set; }

        //ef relationship
        [JsonIgnore]
        public ICollection<Invoice> Invoices { get; set; }
        [ForeignKey("AddressId")]
        [JsonIgnore]
        public Address Address { get; set; }
    }
}
