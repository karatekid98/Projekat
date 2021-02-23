using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface IAddressService
    {
        Address AddAddress(Address address);
        IQueryable<Address> AsQueryable();
        void RemoveAddress(Address address);
        void UpdateAddress(Address existingAddress, Address newAddress);
    }
}