using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using DashboardWebApi.Services;
using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;
using Microsoft.AspNetCore.JsonPatch;

namespace DashboardWebApi.Controllers
{
    [Route("api/sales")]
    public class SalesController : Controller
    {
        public SalesController(ISaleRepostory salesRepostory)
        {
            _salesRepostory = salesRepostory;
        }

        [HttpGet()]
        public IActionResult GetSales()
        {
            IEnumerable<Sale> salesFromRepo = _salesRepostory.GetSales();

            IEnumerable<SaleViewModel> sales = Mapper.Map<IEnumerable<SaleViewModel>>(salesFromRepo);
            return Ok(sales);
        }

        [HttpGet("{id}")]
        public IActionResult GetSale(Guid id)
        {
            Sale saleFromRepo = _salesRepostory.GetSale(id);

            if(saleFromRepo == null)
            {
                return NotFound();
            }

            SaleViewModel sale = Mapper.Map<SaleViewModel>(saleFromRepo);
            return Ok(sale);
        }

        [HttpPatch("salecollection")]
        public IActionResult PartiallyUpdateSaleCollection([FromBody] JsonPatchDocument<IEnumerable<SaleForUpdateViewModel>> patchDoc)
        {
            if(patchDoc == null)
            {
                return BadRequest();
            }

            IEnumerable<Sale> saleCollectionFromRepo = _salesRepostory.GetSales().ToList();

            IEnumerable<SaleForUpdateViewModel> saleCollection = Mapper.Map<IEnumerable<SaleForUpdateViewModel>>(saleCollectionFromRepo);
            patchDoc.ApplyTo(saleCollection);

            return NoContent();
        }

        private ISaleRepostory _salesRepostory;
    }
}
