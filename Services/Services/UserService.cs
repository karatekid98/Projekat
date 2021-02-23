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
            _repositoryWrapper.User.AddUser(user);
            return user;
        }

        public void UpdateUser(User existingUser, User newUser)
        {
            _repositoryWrapper.User.UpdateUser(existingUser, newUser);
        }

        public void RemoveUser(User user)
        {
            _repositoryWrapper.User.RemoveUser(user);
        }
    }
}
