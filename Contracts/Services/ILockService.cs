using System;

namespace Contracts.Services
{
    public interface ILockService
    {
        bool Lock(Guid itemId, Guid userId);
        void Unlock(Guid itemId);
        bool IsItemLocked(Guid itemId);
    }
}