using DataAccess.Entities;
using System.Linq;

namespace Contracts.Services
{
    public interface IShipmentService
    {
        Shipment AddShipment(Shipment shipment);
        IQueryable<Shipment> AsQueryable();
        void RemoveShipment(Shipment shipment);
        void UpdateShipment(Shipment existingShipment, Shipment newShipment);
        void SoftDelete(Shipment shipment);
    }
}