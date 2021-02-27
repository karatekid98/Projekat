﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts.Repositories
{
    public interface IRepositoryBase
    {
        void BeginTransaction();
        void CommitTransaction();
        void RollbackTransaction();
    }
}
