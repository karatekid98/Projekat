using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class AddressRepository : RepositoryBase<Address>, IAddressRepository
    {
        public AddressRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }


        // pozivamo sve metode koje smo kreirali u repository base
        public void AddAddress(Address address)
        {
            Add(address);
        }

        public void RemoveAddress(Address address)
        {
            Remove(address);
        }

        public void UpdateAddress(Address existingAddress, Address newAddress)
        {
            Update(existingAddress, newAddress);
        }
        public void SoftDelete(Address address)
        {
            address.IsDeleted = true;
            base.SoftDelete(address);
        }
    }
}
