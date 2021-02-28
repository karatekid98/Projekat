using DataAccess.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Contracts.Services
{
    public interface IInvoiceProductService
    {
        InvoiceProduct AddInvoiceProduct(InvoiceProduct invoiceProduct);
        IQueryable<InvoiceProduct> AsQueryable();
        void RemoveInvoiceProduct(InvoiceProduct invoiceProduct);
        void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct);
        void SoftDelete(InvoiceProduct invoiceProduct);
        void UndoDelete(InvoiceProduct invoiceProduct);
        List<InvoiceProduct> AddInvoiceProducts(List<InvoiceProduct> invoiceProducts);
    }
}