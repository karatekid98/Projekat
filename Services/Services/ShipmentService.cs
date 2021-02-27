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
            try
            {
                _repositoryWrapper.Shipment.BeginTransaction();
                _repositoryWrapper.Shipment.AddShipment(shipment);
                _repositoryWrapper.Shipment.CommitTransaction();
                return shipment;
            }
            catch (Exception e)
            {
                _repositoryWrapper.Shipment.RollbackTransaction();
                throw e;
            }
    
        }

        public void UpdateShipment(Shipment existingShipment, Shipment newShipment)
        {
            try
            {
                _repositoryWrapper.Shipment.BeginTransaction();
                _repositoryWrapper.Shipment.UpdateShipment(existingShipment, newShipment);
                _repositoryWrapper.Shipment.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Shipment.RollbackTransaction();
                throw e;
            }
          
        }

        public void RemoveShipment(Shipment shipment)
        {
            try
            {
                _repositoryWrapper.Shipment.BeginTransaction();
                _repositoryWrapper.Shipment.RemoveShipment(shipment);
                _repositoryWrapper.Shipment.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Shipment.RollbackTransaction();
                throw e;
            }
        
        }

        public void SoftDelete(Shipment shipment)
        {
            try
            {
                _repositoryWrapper.Shipment.BeginTransaction();
                _repositoryWrapper.Shipment.SoftDelete(shipment);
                _repositoryWrapper.Shipment.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Shipment.RollbackTransaction();
                throw e;
            }

        }

        public void UndoDelete(Shipment shipment)
        {
            try
            {
                _repositoryWrapper.Shipment.BeginTransaction();
                _repositoryWrapper.Shipment.UndoDelete(shipment);
                _repositoryWrapper.Shipment.CommitTransaction();
            }
            catch (Exception e)
            {
                _repositoryWrapper.Shipment.RollbackTransaction();
                throw e;
            }

        }
    }
}
