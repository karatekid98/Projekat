﻿using Contracts.Services;
using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Projekat.Pagination;
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
        public ActionResult<PaginationResponse<Invoice>> GetInvoices([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var invoices = _invoiceService.AsQueryable().Where(x => x.IsDeleted == false);
                if (invoices == null)
                    return NotFound();

                var pagedInvoices = PagedList<Invoice>.ToPagedList(invoices, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<Invoice>.ToPaginationResponse(pagedInvoices);

                return Ok(paginationResponse);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpGet("getDeletedInvoices")]
        public ActionResult<PaginationResponse<Invoice>> GetDeletedInvoices([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var deletedInvoices= _invoiceService.AsQueryable().Where(x => x.IsDeleted == true);

                var pagedDeletedInvoices= PagedList<Invoice>.ToPagedList(deletedInvoices, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<Invoice>.ToPaginationResponse(pagedDeletedInvoices);

                return Ok(paginationResponse);

            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }


        [HttpPost]
        public ActionResult AddInvoice([FromBody] Invoice invoice)
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

        [HttpPost("addInvoices")]
        public ActionResult AddInvoices([FromBody] List<Invoice> invoices)
        {
            try
            {
                foreach (var invoice in invoices)
                {
                    _invoiceService.AddInvoice(invoice);
                }

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult UpdateInvoice(Guid id, [FromBody] Invoice newInvoice)
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

        [HttpPatch("undoDelete/{id}")]
        public ActionResult UndoDelete(Guid id)
        {
            try
            {
                var existingInvoice = _invoiceService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingInvoice == null)
                {
                    return NotFound();
                }

                _invoiceService.UndoDelete(existingInvoice);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
