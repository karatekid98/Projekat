using Contracts.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet("{id}")] 
        public ActionResult<Invoice> GetInvoice(Guid id)
        {
            try
            {
                var invoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (invoice == null)
                {
                    return NotFound();
                }

                return Ok(invoice);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet]
        public ActionResult<List<Invoice>> GetInvoices()
        {
            try
            {
                var invoices = _invoiceService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                if (invoices == null)
                {
                    return NotFound();
                }

                return Ok(invoices);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost]
        public ActionResult<List<Invoice>> AddInvoice([FromBody] Invoice invoice)
        {
            try
            {
                _invoiceService.AddInvoice(invoice);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<List<Invoice>> UpdateInvoice(Guid id, [FromBody] Invoice newInvoice)
        {
            try
            {
                var existingInvoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id);

                if (existingInvoice == null)
                {
                    return NotFound();
                }

                _invoiceService.UpdateInvoice(existingInvoice, newInvoice);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteInvoice(Guid id)
        {
            try
            {
                var existingInvoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id);

                if (existingInvoice == null)
                {
                    return NotFound();
                }

                _invoiceService.RemoveInvoice(existingInvoice);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPatch("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingInvoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingInvoice == null)
                {
                    return NotFound();
                }

                _invoiceService.SoftDelete(existingInvoice);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPut("undoDelete/{id}")]
        public ActionResult UndoDelete(Guid id)
        {
            try
            {
                var existingInvoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingInvoice == null)
                {
                    return NotFound();
                }

                Invoice invoice = new Invoice
                {
                    IsDeleted = false,
                    Date = existingInvoice.Date,
                    IssuerId = existingInvoice.IssuerId,
                    IsPrinted = existingInvoice.IsPrinted,
                    CustomerId = existingInvoice.CustomerId,
                    Id = existingInvoice.Id
                };

                _invoiceService.UpdateInvoice(existingInvoice, invoice);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
