using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class InvoiceProductService : IInvoiceProductService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public InvoiceProductService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<InvoiceProduct> AsQueryable()
        {
            return _repositoryWrapper.InvoiceProduct.AsQueryable();
        }

        public InvoiceProduct AddInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            _repositoryWrapper.InvoiceProduct.AddInvoiceProduct(invoiceProduct);
            return invoiceProduct;
        }

        public void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct)
        {
            _repositoryWrapper.InvoiceProduct.UpdateInvoiceProduct(existingInvoiceProduct, newInvoiceProduct);
        }

        public void RemoveInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            _repositoryWrapper.InvoiceProduct.RemoveInvoiceProduct(invoiceProduct);
        }

    }
}
