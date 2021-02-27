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

            DatabaseContext.Set<T>().Add(entity);
            SaveChanges();

        }

        //pronalazi entity ako postoji i promeni ga na novi(detached mora)
        public void Update(T existing, T entity)
        {
      
            DatabaseContext.Entry(existing).State = EntityState.Detached;
            DatabaseContext.Entry(entity).State = EntityState.Modified;
            SaveChanges();
    
        }

        public void SoftDelete(T entity)
        {
  
            DatabaseContext.Entry(entity).State = EntityState.Modified;
            SaveChanges();

        }

        public void UndoDelete(T entity)
        {
            DatabaseContext.Entry(entity).State = EntityState.Modified;
            SaveChanges();
        }

        public void Remove(T entity)
        {

            DatabaseContext.Set<T>().Remove(entity);
            SaveChanges();
        }

        public void SaveChanges()
        {
            DatabaseContext.SaveChanges();
        }

        public void BeginTransaction()
        {
            DatabaseContext.Database.BeginTransaction();
        }
     
        public void CommitTransaction()
        {
            DatabaseContext.Database.CommitTransaction();
        }

        public void RollbackTransaction()
        {
            DatabaseContext.Database.RollbackTransaction();
        }
    }
}
