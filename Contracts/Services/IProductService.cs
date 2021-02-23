using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface IProductService
    {
        Product AddProduct(Product product);
        IQueryable<Product> AsQueryable();
        void RemoveProduct(Product product);
        void UpdateProduct(Product existingProduct, Product newProduct);
    }
}