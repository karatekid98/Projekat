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
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(Guid id)
        {
            try
            {
                var product = _productService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
                if (product == null)
                {
                    return NotFound();
                }
                return Ok(product);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpGet]
        public ActionResult<PaginationResponse<Product>> GetProducts([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var products = _productService.AsQueryable().Where(x => x.IsDeleted == false);

                var pagedProducts = PagedList<Product>.ToPagedList(products, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<Product>.ToPaginationResponse(pagedProducts);

                return Ok(paginationResponse);
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }
        [HttpGet("getDeletedProducts")]
        public ActionResult<PaginationResponse<Product>> GetDeletedProducts([FromQuery] PaginationParameters parameters)
        {
            try
            {
                var deletedProducts = _productService.AsQueryable().Where(x => x.IsDeleted == true);

                var pagedDeletedProducts = PagedList<Product>.ToPagedList(deletedProducts, parameters.PageNumber, parameters.PageSize);

                var paginationResponse = PagedList<Product>.ToPaginationResponse(pagedDeletedProducts);

                return Ok(paginationResponse);

            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }

        }

        [HttpPost]
        public ActionResult AddProduct([FromBody] Product product)
        {
            try
            {
                _productService.AddProduct(product);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpPost("addProducts")]
        public ActionResult AddProducts([FromBody] List<Product> products)
        {
            try
            {
                _productService.AddProducts(products);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }


        [HttpPut("{id}")]
        public ActionResult UpdateProduct(Guid id, [FromBody] Product newProduct)
        {
            try
            {

                var existingProduct= _productService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingProduct == null)
                {
                    return NotFound();
                }

                _productService.UpdateProduct(existingProduct, newProduct);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        // ovaj quantity stize kroz url
        [HttpPatch("{id}/{quantity}")]
        public ActionResult UpdateProductQuantity(Guid id, int quantity)
        {
            try
            {

                var existingProduct = _productService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);
                if (existingProduct == null)
                {
                    return NotFound();
                }

                _productService.AddQuantity(existingProduct, quantity);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(Guid id)
        {
            try
            {
                var existingProduct = _productService.AsQueryable().FirstOrDefault(x => x.Id == id);
                if (existingProduct == null)
                {
                    return NotFound();
                }

                _productService.RemoveProduct(existingProduct);
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
                var existingProduct = _productService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == false);

                if (existingProduct == null)
                {
                    return NotFound();
                }


                _productService.SoftDelete(existingProduct);
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
                var existingProduct = _productService.AsQueryable().FirstOrDefault(x => x.Id == id && x.IsDeleted == true);

                if (existingProduct == null)
                {
                    return NotFound();
                }

                _productService.UndoDelete(existingProduct);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.GetBaseException().Message);
            }
        }

    }


}
