using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface IUserService
    {
        User AddUser(User user);
        IQueryable<User> AsQueryable();
        void RemoveUser(User user);
        void UpdateUser(User existingUser, User newUser);
        void SoftDelete(User user);
    }
}