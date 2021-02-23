﻿using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface ICustomerRepository
    {
        IQueryable<Customer> AsQueryable();
        void AddCustomer(Customer customer);
        void RemoveCustomer(Customer customer);
        void UpdateCustomer(Customer existingCustomer, Customer newCustomer);
    }
}