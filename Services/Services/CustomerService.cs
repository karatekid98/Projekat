using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public CustomerService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<Customer> AsQueryable()
        {
            return _repositoryWrapper.Customer.AsQueryable();
        }

        public Customer AddCustomer(Customer customer)
        {
            _repositoryWrapper.Customer.AddCustomer(customer);
            return customer;
        }

        public void UpdateCustomer(Customer existingCustomer, Customer newCustomer)
        {
            _repositoryWrapper.Customer.UpdateCustomer(existingCustomer, newCustomer);
        }

        public void RemoveCustomer(Customer customer)
        {
            _repositoryWrapper.Customer.RemoveCustomer(customer);
        }


    }
}
