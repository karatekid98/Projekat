using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public UserService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<User> AsQueryable()
        {
            return _repositoryWrapper.User.AsQueryable();
        }

        public User AddUser(User user)
        {
            try
            {
                _repositoryWrapper.User.BeginTransaction();
                _repositoryWrapper.User.AddUser(user);
                _repositoryWrapper.User.CommitTransaction();
                return user;
            }
            catch (Exception e)
            {
                _repositoryWrapper.User.RollbackTransaction();
                throw e;
            }
         
        }

        public void UpdateUser(User existingUser, User newUser)
        {
            try
            {
                _repositoryWrapper.User.BeginTransaction();
                _repositoryWrapper.User.UpdateUser(existingUser, newUser);
                _repositoryWrapper.User.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.User.RollbackTransaction();
                throw e;
            }
            
        }

        public void RemoveUser(User user)
        {
            try
            {
                _repositoryWrapper.User.BeginTransaction();
                _repositoryWrapper.User.RemoveUser(user);
                _repositoryWrapper.User.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.User.RollbackTransaction();
                throw e;
            }
            
        }

        public void SoftDelete(User user)
        {
            try
            {
                _repositoryWrapper.User.BeginTransaction();
                _repositoryWrapper.User.SoftDelete(user);
                _repositoryWrapper.User.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.User.RollbackTransaction();
                throw e;
            }
          
        }

        public void UndoDelete(User user)
        {
            try
            {
                _repositoryWrapper.User.BeginTransaction();
                _repositoryWrapper.User.UndoDelete(user);
                _repositoryWrapper.User.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.User.RollbackTransaction();
                throw e;
            }

        }
    }
}
