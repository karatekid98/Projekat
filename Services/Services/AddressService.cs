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
            try
            {
                _repositoryWrapper.Address.BeginTransaction();
                _repositoryWrapper.Address.AddAddress(address);
                _repositoryWrapper.Address.CommitTransaction();
                return address;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Address.RollbackTransaction();
                throw e;
            }
       
        }

        public void UpdateAddress(Address existingAddress, Address newAddress)
        {
            try
            {
                _repositoryWrapper.Address.BeginTransaction();
                _repositoryWrapper.Address.UpdateAddress(existingAddress, newAddress);
                _repositoryWrapper.Address.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Address.RollbackTransaction();
                throw e;
            }
        
        }

        public void RemoveAddress(Address address)
        {
            try
            {
                _repositoryWrapper.Address.BeginTransaction();
                _repositoryWrapper.Address.RemoveAddress(address);
                _repositoryWrapper.Address.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Address.RollbackTransaction();
                throw e;
            }
         
        }

        public void SoftDelete(Address address)
        {
            try
            {
                _repositoryWrapper.Address.BeginTransaction();
                _repositoryWrapper.Address.SoftDelete(address);
                _repositoryWrapper.Address.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Address.RollbackTransaction();
                throw e;
            }
         
        }
    }
}
