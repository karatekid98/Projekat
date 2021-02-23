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
                var product = _productService.AsQueryable().FirstOrDefault(x => x.Id == id);
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
        public ActionResult<List<Product>> GetProducts()
        {
            try
            {
                var products = _productService.AsQueryable().ToList();

                return Ok(products);
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
    }


}
