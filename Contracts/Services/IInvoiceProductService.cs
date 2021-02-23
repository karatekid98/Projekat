using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface IInvoiceProductService
    {
        InvoiceProduct AddInvoiceProduct(InvoiceProduct invoiceProduct);
        IQueryable<InvoiceProduct> AsQueryable();
        void RemoveInvoiceProduct(InvoiceProduct invoiceProduct);
        void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct);
    }
}