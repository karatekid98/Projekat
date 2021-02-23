using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class Invoice : EntityBase
    {
        public DateTime Date { get; set; }
        public Guid CustomerId { get; set; }
        public Guid IssuerId { get; set; }
        public bool IsPrinted { get; set; }

        // ef relationship
        [JsonIgnore]
        public ICollection<Shipment> Shipments { get; set; }
        [JsonIgnore]
        public ICollection<InvoiceProduct> InvoiceProducts { get; set; }
        [JsonIgnore]
        [ForeignKey("IssuerId")]
        public User User { get; set; }
        [JsonIgnore]
        [ForeignKey("CustomerId")]
        public Customer Customer { get; set; }
    }

   
}
