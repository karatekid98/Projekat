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
            _repositoryWrapper.Product.AddProduct(product);
            return product;
        }

        public void UpdateProduct(Product existingProduct, Product newProduct)
        {
            _repositoryWrapper.Product.UpdateProduct(existingProduct, newProduct);
        }

        public void RemoveProduct(Product product)
        {
            _repositoryWrapper.Product.RemoveProduct(product);
        }
    }
}
