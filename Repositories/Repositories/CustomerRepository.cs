using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }


        // pozivamo sve metode koje smo kreirali u repository base
        public void AddCustomer(Customer customer)
        {
            Add(customer);
        }

        public void RemoveCustomer(Customer customer)
        {
            Remove(customer);
        }

        public void UpdateCustomer(Customer existingCustomer, Customer newCustomer)
        {
            Update(existingCustomer, newCustomer);
        }

        public void SoftDelete(Customer customer)
        {
            customer.IsDeleted = true;
            base.SoftDelete(customer);
        }
    }
}