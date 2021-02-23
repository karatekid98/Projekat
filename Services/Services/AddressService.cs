using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class AddressService : IAddressService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public AddressService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<Address> AsQueryable()
        {
            return _repositoryWrapper.Address.AsQueryable();
        }

        public Address AddAddress(Address address)
        {
            _repositoryWrapper.Address.AddAddress(address);
            return address;
        }

        public void UpdateAddress(Address existingAddress, Address newAddress)
        {
            _repositoryWrapper.Address.UpdateAddress(existingAddress, newAddress);
        }

        public void RemoveAddress(Address address)
        {
            _repositoryWrapper.Address.RemoveAddress(address);
        }


    }
}
