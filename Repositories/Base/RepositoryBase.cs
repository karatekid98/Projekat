using DataAccess;
using DataAccess.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Repositories.Base
{
    public abstract class RepositoryBase<T> where T : EntityBase 
    {
        protected DatabaseContext DatabaseContext { get; set; }
        public RepositoryBase(DatabaseContext databaseContext) 
        {
            DatabaseContext = databaseContext;
        }

        //vraca odgovarajuci set iz database context-a
        public IQueryable<T> AsQueryable()
        {
            return DatabaseContext.Set<T>();
        }

        //dodaje u set prosledjeni entity
        public void Add(T entity)
        {
            try
            {
                DatabaseContext.Database.BeginTransaction();
                DatabaseContext.Set<T>().Add(entity);
                SaveChanges();
                DatabaseContext.Database.CommitTransaction();
            }
            catch (Exception e)
            {
                DatabaseContext.Database.RollbackTransaction();
                throw e;
            }
    
        }

        //pronalayi entity ako postoji i promeni ga na novi(detached mora)
        public void Update(T existing, T entity)
        {
            try
            {
                DatabaseContext.Database.BeginTransaction();
                DatabaseContext.Entry(existing).State = EntityState.Detached;
                DatabaseContext.Entry(entity).State = EntityState.Modified;
                SaveChanges();
                DatabaseContext.Database.CommitTransaction();
            }
            catch (Exception e)
            {
                DatabaseContext.Database.RollbackTransaction();
                throw e;
            }
         
        }

        public void Remove(T entity)
        {
            try
            {
                DatabaseContext.Database.BeginTransaction();
                DatabaseContext.Set<T>().Remove(entity);
                SaveChanges();
                DatabaseContext.Database.CommitTransaction();
            }
            catch (Exception e)
            {
                DatabaseContext.Database.RollbackTransaction();
                throw e;
            }
        }

        public void SaveChanges()
        {
            DatabaseContext.SaveChanges();
        }
    }
}
