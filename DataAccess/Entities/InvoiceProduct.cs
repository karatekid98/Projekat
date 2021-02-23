using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class InvoiceProduct : EntityBase
    {
        public Guid InvoiceId { get; set; }
        public Guid ProductId { get; set; }

        // ef relationship
        [JsonIgnore]
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }
        [ForeignKey("ProductId")]
        [JsonIgnore]
        public Product Product { get; set; }
    }
}
