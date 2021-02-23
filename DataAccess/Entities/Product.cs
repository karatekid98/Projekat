using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Entities
{
    public class Product : EntityBase
    {
        public string Name { get; set; }
        public string Unit { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }

        //ef relationship
        [JsonIgnore]
        public ICollection<InvoiceProduct> InvoiceProducts { get; set; }
    }
}
