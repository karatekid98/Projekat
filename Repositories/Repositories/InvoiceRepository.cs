using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class InvoiceRepository : RepositoryBase<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }


        // pozivamo sve metode koje smo kreirali u repository base
        public void AddInvoice(Invoice invoice)
        {
            Add(invoice);
        }

        public void RemoveInvoice(Invoice invoice)
        {
            Remove(invoice);
        }

        public void UpdateInvoice(Invoice existingInvoice, Invoice newInvoice)
        {
            Update(existingInvoice, newInvoice);
        }

        public void SoftDelete(Invoice invoice)
        {
            invoice.IsDeleted = true;
            base.SoftDelete(invoice);
        }

        public void UndoDelete(Invoice invoice)
        {
            invoice.IsDeleted = false;
            base.UndoDelete(invoice);
        }
    }
}
