using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        // pozivamo sve metode koje smo kreirali u repository base
        public void AddProduct(Product product)
        {
            Add(product);
        }

        public void RemoveProduct(Product product)
        {
            Remove(product);
        }

        public void UpdateProduct(Product existingProduct, Product newProduct)
        {
            Update(existingProduct, newProduct);
        }

        public void SoftDelete(Product product)
        {
            product.IsDeleted = true;
            base.SoftDelete(product);
        }

        public void UndoDelete(Product product)
        {
            product.IsDeleted = false;
            base.UndoDelete(product);
        }
    }
}
