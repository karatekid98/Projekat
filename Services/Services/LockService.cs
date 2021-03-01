using Contracts.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Services
{
    public class LockService : ILockService
    {
        private Dictionary<Guid, Guid> _lockedItems { get; set; }
        public LockService() 
        {
            _lockedItems = new Dictionary<Guid, Guid>();
        }

        public bool Lock(Guid itemId, Guid userId)
        {
     
            var itemAlreadyLocked = _lockedItems.ContainsKey(itemId);
            if(itemAlreadyLocked)
            {
                return false;
            }

            _lockedItems[itemId] = userId;
            return true;
        }

        public void Unlock(Guid itemId)
        {
            _lockedItems.Remove(itemId);
        }

        public bool IsItemLocked(Guid itemId)
        {
            var isLocked = _lockedItems.ContainsKey(itemId);
            return isLocked;
        }

    }


}
