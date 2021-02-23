using Contracts.Repositories;
using DataAccess;
using DataAccess.Entities;
using Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class ShipmentRepository : RepositoryBase<Shipment>, IShipmentRepository
    {
        public ShipmentRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        // pozivamo sve metode koje smo kreirali u repository base
        public void AddShipment(Shipment shipment)
        {
            Add(shipment);
        }

        public void RemoveShipment(Shipment shipment)
        {
            Remove(shipment);
        }

        public void UpdateShipment(Shipment existingShipment, Shipment newShipment)
        {
            Update(existingShipment, newShipment);
        }
    }
}
