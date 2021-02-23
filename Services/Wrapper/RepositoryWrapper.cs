using Contracts.Repositories;
using Contracts.Wrapper;
using DataAccess;
using Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Wrapper
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        //field je, nema get set, _ zato sto je private
        private readonly DatabaseContext _databaseContext;
        //func svaki put nova instanca databasecontext-a, zato mora invoke
        public RepositoryWrapper(Func<DatabaseContext> databaseContext)
        {
            _databaseContext = databaseContext.Invoke();
        }

        private IUserRepository _userRepository;

        public IUserRepository User
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_databaseContext);
                }
                return _userRepository;
            }
        }

        private IAddressRepository _addressRepository;

        public IAddressRepository Address
        {
            get
            {
                if (_addressRepository == null)
                {
                    _addressRepository = new AddressRepository(_databaseContext);
                }
                return _addressRepository;
            }
        }


        private ICustomerRepository _customerRepository;

        public ICustomerRepository Customer
        {
            get
            {
                if (_customerRepository == null)
                {
                    _customerRepository = new CustomerRepository(_databaseContext);
                }
                return _customerRepository;
            }
        }

        private IInvoiceRepository _invoiceRepository;

        public IInvoiceRepository Invoice
        {
            get
            {
                if (_invoiceRepository == null)
                {
                    _invoiceRepository = new InvoiceRepository(_databaseContext);
                }
                return _invoiceRepository;
            }
        }

        private IInvoiceProductRepository _invoiceProductRepository;

        public IInvoiceProductRepository InvoiceProduct
        {
            get
            {
                if (_invoiceProductRepository == null)
                {
                    _invoiceProductRepository = new InvoiceProductRepository(_databaseContext);
                }
                return _invoiceProductRepository;
            }
        }

        private IProductRepository _productRepository;

        public IProductRepository Product
        {
            get
            {
                if (_productRepository == null)
                {
                    _productRepository = new ProductRepository(_databaseContext);
                }
                return _productRepository;
            }
        }

        private IShipmentRepository _shipmentRepository;

        public IShipmentRepository Shipment
        {
            get
            {
                if (_shipmentRepository == null)
                {
                    _shipmentRepository = new ShipmentRepository(_databaseContext);
                }
                return _shipmentRepository;
            }
        }

    }
}
