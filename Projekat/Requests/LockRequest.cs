using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Requests
{
    public class LockRequest
    {
        [Required]
        public Guid ItemId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
