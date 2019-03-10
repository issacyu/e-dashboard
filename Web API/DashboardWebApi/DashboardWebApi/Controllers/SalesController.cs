using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
            List<Sale> saleCollectionFromRepo = _salesRepostory.GetSales().ToList();
            if (patchDoc == null)
            {
                return BadRequest();
            }

            IEnumerable<SaleForUpdateViewModel> saleCollectionViewModel = Mapper.Map<IEnumerable<SaleForUpdateViewModel>>(saleCollectionFromRepo);
            patchDoc.ApplyTo(saleCollectionViewModel);
            List<Sale> updatedSaleCollection = Mapper.Map<List<Sale>>(saleCollectionViewModel);

            foreach(Sale s in updatedSaleCollection)
            {
                if(_salesRepostory.SaleExists(s))
                {
                    _salesRepostory.UpdateSale(s);
                }
                else
                {
                    _salesRepostory.AddSale(s);
                }
            }

            _salesRepostory.RemoveSale(updatedSaleCollection);

            if (!_salesRepostory.Save())
            {
                throw new Exception("Patching sale collection failed on save");
            }
        
            return NoContent();
        }

        private ISaleRepostory _salesRepostory;
    }
}
