using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class InvoiceProductRepository : RepositoryBase<InvoiceProduct>, IInvoiceProductRepository
    {
        public InvoiceProductRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }


        // pozivamo sve metode koje smo kreirali u repository base
        public void AddInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            Add(invoiceProduct);
        }

        public void RemoveInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            Remove(invoiceProduct);
        }

        public void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct)
        {
            Update(existingInvoiceProduct, newInvoiceProduct);
        }

        public void SoftDelete(InvoiceProduct invoiceProduct)
        {
            invoiceProduct.IsDeleted = true;
            base.SoftDelete(invoiceProduct);
        }

        public void UndoDelete(InvoiceProduct invoiceProduct)
        {
            invoiceProduct.IsDeleted = false;
            base.UndoDelete(invoiceProduct);
        }
    }
}
