using DataAccess.Entities;
using System;
using System.Linq;

namespace Contracts.Services
{
    public interface IInvoiceService
    {
        Invoice AddInvoice(Invoice invoice);
        IQueryable<Invoice> AsQueryable();
        void RemoveInvoice(Invoice invoice);
        void UpdateInvoice(Invoice existingInvoice, Invoice newInvoice);

        void SoftDelete(Invoice invoice);
    }
}