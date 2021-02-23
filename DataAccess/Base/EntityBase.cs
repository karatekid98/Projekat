using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Base
{
    public class EntityBase
    {
        // ako stigne null vrenost, postavi da bude default novi guid 
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public bool IsDeleted { get; set; }

    }
}
