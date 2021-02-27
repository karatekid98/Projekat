using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class ProductService : IProductService
    {

        private readonly IRepositoryWrapper _repositoryWrapper;

        public ProductService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<Product> AsQueryable()
        {
            return _repositoryWrapper.Product.AsQueryable();
        }

        public Product AddProduct(Product product)
        {
            try
            {
                _repositoryWrapper.Product.BeginTransaction();
                _repositoryWrapper.Product.AddProduct(product);
                _repositoryWrapper.Product.CommitTransaction();
                return product;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Product.RollbackTransaction();
                throw e;
            }
            
        }

        public List<Product> AddProducts(List<Product> products)
        {
            try
            {
                _repositoryWrapper.Product.BeginTransaction();
                foreach (var  product in products)
                {
                    _repositoryWrapper.Product.AddProduct(product);
                }

                _repositoryWrapper.Product.CommitTransaction();
                return products;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Product.RollbackTransaction();
                throw e;
            }

        }
        public void UpdateProduct(Product existingProduct, Product newProduct)
        {
            try
            {
                _repositoryWrapper.Product.BeginTransaction();
                _repositoryWrapper.Product.UpdateProduct(existingProduct, newProduct);
                _repositoryWrapper.Product.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Product.RollbackTransaction();
                throw e;
            }
           
        }

        public void RemoveProduct(Product product)
        {
            try
            {
                _repositoryWrapper.Product.BeginTransaction();
                _repositoryWrapper.Product.RemoveProduct(product);
                _repositoryWrapper.Product.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Product.RollbackTransaction();
                throw e;
            }
            
        }

        public void SoftDelete(Product product)
        {
            try
            {
                _repositoryWrapper.Product.BeginTransaction();
                _repositoryWrapper.Product.SoftDelete(product);
                _repositoryWrapper.Product.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Product.RollbackTransaction();
                throw e;
            }
           
        }
    }
}
