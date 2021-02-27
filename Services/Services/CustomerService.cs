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
            try
            {
                _repositoryWrapper.Customer.BeginTransaction();
                _repositoryWrapper.Customer.AddCustomer(customer);
                _repositoryWrapper.Customer.CommitTransaction();
                return customer;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Customer.RollbackTransaction();
                throw e;
            }
     
        }

        public void UpdateCustomer(Customer existingCustomer, Customer newCustomer)
        {
            try
            {
                _repositoryWrapper.Customer.BeginTransaction();
                _repositoryWrapper.Customer.UpdateCustomer(existingCustomer, newCustomer);
                _repositoryWrapper.Customer.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Customer.RollbackTransaction();
                throw e;
            }
           
        }

        public void RemoveCustomer(Customer customer)
        {
            try
            {
                _repositoryWrapper.Customer.BeginTransaction();
                _repositoryWrapper.Customer.RemoveCustomer(customer);
                _repositoryWrapper.Customer.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Customer.RollbackTransaction();
                throw e;
            }
   
        }

        public void SoftDelete(Customer customer)
        {
            try
            {
                _repositoryWrapper.Customer.BeginTransaction();
                _repositoryWrapper.Customer.SoftDelete(customer);
                _repositoryWrapper.Customer.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Customer.RollbackTransaction();
                throw e;
            }
        }

        public void UndoDelete(Customer customer)
        {
            try
            {
                _repositoryWrapper.Customer.BeginTransaction();
                _repositoryWrapper.Customer.UndoDelete(customer);
                _repositoryWrapper.Customer.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Customer.RollbackTransaction();
                throw e;
            }

        }
    }
}
