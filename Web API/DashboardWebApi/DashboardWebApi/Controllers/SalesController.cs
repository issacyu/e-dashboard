using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Dynamic;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.JsonPatch.Operations;

using DashboardWebApi.Services;
using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;
using DashboardWebApi.Extensions;


namespace DashboardWebApi.Controllers
{
    [Route("api/sales")]
    [EnableCors("CorsPolicy")]
    public class SalesController : Controller
    {
        public SalesController(ISaleRepostory salesRepostory, IMapper mapper)
        {
            _salesRepostory = salesRepostory;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetSales()
        {
            IEnumerable<Sale> saleFromRepo = _salesRepostory.GetSales();
            SaleDto saleDto = new SaleDto
            {
                Sales = saleFromRepo,
                TopSales = await saleFromRepo.GetTopSales(5),
                SaleProfitByDates = await saleFromRepo.GetSaleProfitByDate(),
                CompletedReturnedRatios = await saleFromRepo.GetCompletedReturnedRatio()
            };
            return Ok(saleDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSale(Guid id)
        {
            Sale saleFromRepo = _salesRepostory.GetSale(id);

            if(saleFromRepo == null)
            {
                return NotFound();
            }

            SaleDto sale = Mapper.Map<SaleDto>(saleFromRepo);
            return Ok(sale);
        }

        [HttpPatch("salecollection")]
        public async Task<IActionResult> PartiallyUpdateSaleCollection([FromBody] JsonPatchDocument<IEnumerable<SaleForUpdateDto>> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }
            IEnumerable<Sale> saleFromRepo = _salesRepostory.GetSales();
            await ModifyPatchPath(patchDoc, saleFromRepo.Count());

            IEnumerable<SaleForUpdateDto> saleCollectionDto =
                _mapper.Map<IEnumerable<SaleForUpdateDto>>(saleFromRepo);
            patchDoc.ApplyTo(saleCollectionDto);
            List<Sale> updatedSaleCollection = _mapper.Map<List<Sale>>(saleCollectionDto);

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

        /// <summary>
        /// Handle the edge case when adding new row to any data grid.
        /// When adding new row to a grid, the path in patchDoc should
        /// be "/-"(it means adding new array item to the end of array).
        /// </summary>
        /// <param name="patchDoc">The json patch document.</param>
        private async Task ModifyPatchPath(JsonPatchDocument<IEnumerable<SaleForUpdateDto>> patchDoc, int collectionSize)
        {
            foreach(Operation operation in patchDoc.Operations)
            {
                int index = 0;
                if (operation.OperationType.ToString() == "Add" && int.TryParse(operation.path.Split("/")[1], out index))
                {
                    if(index >= collectionSize)
                    {
                        operation.path = "/-";
                    }
                }
            }
        }

        private readonly ISaleRepostory _salesRepostory;
        private readonly IMapper _mapper;
    }
}
