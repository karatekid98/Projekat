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
            try
            {
                _repositoryWrapper.Invoice.BeginTransaction();
                _repositoryWrapper.Invoice.AddInvoice(invoice);
                _repositoryWrapper.Invoice.CommitTransaction();
                return invoice;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Invoice.RollbackTransaction();
                throw e;
            }
       
         
        }

        public void UpdateInvoice(Invoice existingInvoice, Invoice newInvoice)
        {
            try
            {
                _repositoryWrapper.Invoice.BeginTransaction();
                _repositoryWrapper.Invoice.UpdateInvoice(existingInvoice, newInvoice);
                _repositoryWrapper.Invoice.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Invoice.RollbackTransaction();
                throw e;
            }
     
        }

        public void RemoveInvoice(Invoice invoice)
        {
            try
            {
                _repositoryWrapper.Invoice.BeginTransaction();
                _repositoryWrapper.Invoice.RemoveInvoice(invoice);
                _repositoryWrapper.Invoice.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Invoice.RollbackTransaction();
                throw e;
            }
           
        }

        // ovu metodu pozivamo i kad se brise shipment za taj invoice, takodje i invoiceproduct brise
        public void SoftDelete(Invoice invoice)
        {
            try
            {
                _repositoryWrapper.Invoice.BeginTransaction();
                var existingInvoice = _repositoryWrapper.Invoice.AsQueryable().First(x => x.Id == invoice.Id);
                _repositoryWrapper.Invoice.SoftDelete(existingInvoice);

                var invoiceProducts = _repositoryWrapper.InvoiceProduct.AsQueryable().Where(x => x.InvoiceId == invoice.Id && x.IsDeleted == false);

                foreach (var invoiceProduct in invoiceProducts)
                {
                    _repositoryWrapper.InvoiceProduct.SoftDelete(invoiceProduct);
                }

                var invoiceShipments = _repositoryWrapper.Shipment.AsQueryable().Where(x => x.InvoiceId == invoice.Id && x.IsDeleted == false);

                foreach (var invoiceShipment in invoiceShipments)
                {
                    invoiceShipment.IsDeleted = true;
                    _repositoryWrapper.Shipment.SoftDelete(invoiceShipment);
                }
                _repositoryWrapper.Invoice.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Invoice.RollbackTransaction();
                throw e;
            }
      
        }
    }
}
