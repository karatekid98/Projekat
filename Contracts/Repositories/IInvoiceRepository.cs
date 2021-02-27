using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IInvoiceRepository : IRepositoryBase
    {
        IQueryable<Invoice> AsQueryable();
        void AddInvoice(Invoice invoice);
        void RemoveInvoice(Invoice invoice);
        void UpdateInvoice(Invoice existingInvoice, Invoice newInvoice);
        void SoftDelete(Invoice invoice);

    }
}