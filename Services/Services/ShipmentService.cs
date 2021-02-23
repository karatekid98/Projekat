using Contracts.Services;
using Contracts.Wrapper;
using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public ShipmentService(IRepositoryWrapper repositoryWrapper)
        {
            _repositoryWrapper = repositoryWrapper;
        }

        //implementirati sve sto postoju address(odgovarajucem) repository
        public IQueryable<Shipment> AsQueryable()
        {
            return _repositoryWrapper.Shipment.AsQueryable();
        }

        public Shipment AddShipment(Shipment shipment)
        {
            _repositoryWrapper.Shipment.AddShipment(shipment);
            return shipment;
        }

        public void UpdateShipment(Shipment existingShipment, Shipment newShipment)
        {
            _repositoryWrapper.Shipment.UpdateShipment(existingShipment, newShipment);
        }

        public void RemoveShipment(Shipment shipment)
        {
            _repositoryWrapper.Shipment.RemoveShipment(shipment);
        }
    }
}
