using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        // pozivamo sve metode koje smo kreirali u repository base
        public void AddUser(User user)
        {
            Add(user);
        }

        public void RemoveUser(User user)
        {
            Remove(user);
        }

        public void UpdateUser(User existingUser, User newUser)
        {
            Update(existingUser, newUser);
        }

        public void SoftDelete(User user)
        {
            user.IsDeleted = true;
            base.SoftDelete(user);
        }
    }
}