using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IInvoiceProductRepository
    {
        IQueryable<InvoiceProduct> AsQueryable();
        void AddInvoiceProduct(InvoiceProduct invoiceProduct);
        void RemoveInvoiceProduct(InvoiceProduct invoiceProduct);
        void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct);
    }
}