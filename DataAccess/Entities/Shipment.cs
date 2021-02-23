using DataAccess.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class Shipment : EntityBase
    {
        public DateTime DateOfShipment { get; set; }
        public Guid InvoiceId { get; set; }


        // ef relationship
        [JsonIgnore]
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }
    }
}
