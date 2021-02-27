using DataAccess.Entities;
using System.Linq;

namespace Contracts.Repositories
{
    public interface IShipmentRepository : IRepositoryBase
    {
        IQueryable<Shipment> AsQueryable();
        void AddShipment(Shipment shipment);
        void RemoveShipment(Shipment shipment);
        void UpdateShipment(Shipment existingShipment, Shipment newShipment);

        void SoftDelete(Shipment shipment);
    }
}