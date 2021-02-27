using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface ICustomerService
    {
        Customer AddCustomer(Customer customer);
        IQueryable<Customer> AsQueryable();
        void RemoveCustomer(Customer customer);
        void UpdateCustomer(Customer existingCustomer, Customer newCustomer);
        void SoftDelete(Customer customer);
        void UndoDelete(Customer customer);
    }
}