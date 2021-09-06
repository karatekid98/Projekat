using Contracts.Services;
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
    public class InvoiceProductController : ControllerBase
    {
        private readonly IInvoiceProductService _invoiceProductService;

        public InvoiceProductController(IInvoiceProductService invoiceProductService)
        {
            _invoiceProductService = invoiceProductService;
        }

        [HttpGet("{id}")]
        public ActionResult<InvoiceProduct> GetInvoiceProduct(Guid id)
        {
            try
            {
                var invoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
                if (invoiceProduct == null)
                {
                    return NotFound();
                }
                return Ok(invoiceProduct);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpGet]
        public ActionResult<PaginationResponse<InvoiceProduct>> GetInvoiceProducts([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var invoiceProducts = _invoiceProductService.AsQueryable().Where(x => x.IsDeleted == false);
                
                var pagedinvoiceProducts = PagedList<InvoiceProduct>.ToPagedList(invoiceProducts, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<InvoiceProduct>.ToPaginationResponse(pagedinvoiceProducts);

                return Ok(paginationResponse);
            }
            catch (Exception e)
            {

                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpGet("getAllProducts/{id}")]
        public ActionResult<InvoiceProduct> GetInvoiceProductsNoPag(Guid id, [FromQuery] PaginationParameters parameters)
        {
         
            try
            {
                var invoiceProducts = _invoiceProductService.AsQueryable().Where(x => x.InvoiceId == id && x.IsDeleted == false);

                return Ok(invoiceProducts);
            }
            catch (Exception e)
            {

                return BadRequest(e.GetBaseException().Message);
            }

        }


        [HttpGet("getDeletedInvoiceProducts")]
        public ActionResult<PaginationResponse<InvoiceProduct>> GetDeletedInvoiceProducts([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var deletedInvoiceProducts = _invoiceProductService.AsQueryable().Where(x => x.IsDeleted == true);

                var pagedDeletedInvoiceProducts = PagedList<InvoiceProduct>.ToPagedList(deletedInvoiceProducts, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<InvoiceProduct>.ToPaginationResponse(pagedDeletedInvoiceProducts);

                return Ok(paginationResponse);

            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult<InvoiceProduct> AddInvoiceProduct([FromBody] InvoiceProduct invoiceProduct)
        {
            try
            {
                var newInvoiceProduct = _invoiceProductService.AddInvoiceProduct(invoiceProduct);

                return Ok(newInvoiceProduct);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("addInvoiceProducts")]
        public ActionResult<List<InvoiceProduct>> AddInvoiceProducts([FromBody] List<InvoiceProduct> invoiceProducts)
        {
            try
            {
                var newInvoiceProducts = _invoiceProductService.AddInvoiceProducts(invoiceProducts);
          
                return Ok(newInvoiceProducts);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpPut("{id}")]
        public ActionResult UpdateInvoiceProduct(Guid id, [FromBody] InvoiceProduct newInvoiceProduct)
        {
            try
            {

                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                _invoiceProductService.UpdateInvoiceProduct(existingInvoiceProduct, newInvoiceProduct);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteInvoiceProduct(Guid id)
        {
            try
            {
                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                _invoiceProductService.RemoveInvoiceProduct(existingInvoiceProduct);
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
                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                _invoiceProductService.SoftDelete(existingInvoiceProduct);
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
                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                _invoiceProductService.UndoDelete(existingInvoiceProduct);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
