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
            try
            {
                _repositoryWrapper.InvoiceProduct.BeginTransaction();
                _repositoryWrapper.InvoiceProduct.AddInvoiceProduct(invoiceProduct);
                _repositoryWrapper.InvoiceProduct.CommitTransaction();
                return invoiceProduct;
            }
            catch (Exception e)
            {
                _repositoryWrapper.InvoiceProduct.RollbackTransaction();
                throw e;
            }
           
        }

        public void UpdateInvoiceProduct(InvoiceProduct existingInvoiceProduct, InvoiceProduct newInvoiceProduct)
        {
            try
            {
                _repositoryWrapper.InvoiceProduct.BeginTransaction();
                _repositoryWrapper.InvoiceProduct.UpdateInvoiceProduct(existingInvoiceProduct, newInvoiceProduct);
                _repositoryWrapper.InvoiceProduct.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.InvoiceProduct.RollbackTransaction();
                throw e;
            }
 
        }

        public void RemoveInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            try
            {
                _repositoryWrapper.InvoiceProduct.BeginTransaction();
                _repositoryWrapper.InvoiceProduct.RemoveInvoiceProduct(invoiceProduct);
                _repositoryWrapper.InvoiceProduct.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.InvoiceProduct.RollbackTransaction();
                throw e;
            }
            
        }

        public void SoftDelete(InvoiceProduct invoiceProduct)
        {
            try
            {
                _repositoryWrapper.InvoiceProduct.BeginTransaction();
                _repositoryWrapper.InvoiceProduct.SoftDelete(invoiceProduct);
                _repositoryWrapper.InvoiceProduct.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.InvoiceProduct.RollbackTransaction();
                throw e;
            }
      
        }
    }
}
