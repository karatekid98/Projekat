using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IProductRepository : IRepositoryBase
    {
        IQueryable<Product> AsQueryable();
        void AddProduct(Product product);
        void RemoveProduct(Product product);
        void UpdateProduct(Product existingProduct, Product newProduct);
        void SoftDelete(Product product);
        void UndoDelete(Product product);
    }
}