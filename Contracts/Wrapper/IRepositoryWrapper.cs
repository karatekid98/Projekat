using Contracts.Repositories;

namespace Contracts.Wrapper
{
    public interface IRepositoryWrapper
    {
        IAddressRepository Address { get; }
        ICustomerRepository Customer { get; }
        IInvoiceRepository Invoice { get; }
        IInvoiceProductRepository InvoiceProduct { get; }
        IProductRepository Product { get; }
        IShipmentRepository Shipment { get; }
        IUserRepository User { get; }
    }
}