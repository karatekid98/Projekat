using DataAccess.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Contracts.Services
{
    public interface IProductService
    {
        Product AddProduct(Product product);
        List<Product> AddProducts(List<Product> products);
        IQueryable<Product> AsQueryable();
        void RemoveProduct(Product product);
        void UpdateProduct(Product existingProduct, Product newProduct);
        void SoftDelete(Product product);
        void UndoDelete(Product product);
        void AddQuantity(Product existingProduct, int quantity);
    }
}