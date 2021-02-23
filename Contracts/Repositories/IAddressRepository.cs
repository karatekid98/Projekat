using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IAddressRepository
    {
        IQueryable<Address> AsQueryable();
        void AddAddress(Address address);
        void RemoveAddress(Address address);
        void UpdateAddress(Address existingAddress, Address newAddress);
    }
}