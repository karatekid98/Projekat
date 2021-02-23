using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public InvoiceService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<Invoice> AsQueryable()
        {
            return _repositoryWrapper.Invoice.AsQueryable();
        }

        public Invoice AddInvoice(Invoice invoice)
        {
            _repositoryWrapper.Invoice.AddInvoice(invoice);
            return invoice;
        }

        public void UpdateInvoice(Invoice existingInvoice, Invoice newInvoice)
        {
            _repositoryWrapper.Invoice.UpdateInvoice(existingInvoice, newInvoice);
        }

        public void RemoveInvoice(Invoice invoice)
        {
            _repositoryWrapper.Invoice.RemoveInvoice(invoice);
        }

    }
}
