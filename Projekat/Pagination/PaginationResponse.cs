using DataAccess.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Pagination
{
    public class PaginationResponse<T>
    {
        public PagedList<T> PagedList { get; set; }

        public PagedListMetadata Metadata{ get; set; }
    }
}
