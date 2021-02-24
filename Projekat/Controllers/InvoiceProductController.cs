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
        public ActionResult<List<InvoiceProduct>> GetInvoiceProducts()
        {
            try
            {
                var invoiceProducts = _invoiceProductService.AsQueryable().Where(x => x.IsDeleted == false).ToList();

                return Ok(invoiceProducts);
            }
            catch (Exception e)
            {

                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult AddInvoiceProduct([FromBody] InvoiceProduct invoiceProduct)
        {
            try
            {
                _invoiceProductService.AddInvoiceProduct(invoiceProduct);

                return Ok();
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


        [HttpPut("softDelete/{id}")]
        public ActionResult SoftDelete(Guid id)
        {
            try
            {
                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                InvoiceProduct invoiceProduct = new InvoiceProduct
                {
                    IsDeleted = true,
                    Id = existingInvoiceProduct.Id
                };

                _invoiceProductService.UpdateInvoiceProduct(existingInvoiceProduct, invoiceProduct);
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
                var existingInvoiceProduct = _invoiceProductService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingInvoiceProduct == null)
                {
                    return NotFound();
                }

                InvoiceProduct invoiceProduct = new InvoiceProduct
                {
                    IsDeleted = false,
                    Id = existingInvoiceProduct.Id
                };

                _invoiceProductService.UpdateInvoiceProduct(existingInvoiceProduct, invoiceProduct);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }
    }
}
