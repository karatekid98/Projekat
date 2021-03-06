﻿using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IUserRepository : IRepositoryBase
    {
        IQueryable<User> AsQueryable();
        void AddUser(User user);
        void RemoveUser(User user);
        void UpdateUser(User existingUser, User newUser);
        void SoftDelete(User user);
        void UndoDelete(User user);
    }
}