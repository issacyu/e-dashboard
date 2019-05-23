using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Cors;

using DashboardWebApi.Services;
using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;
using DashboardWebApi.Extensions;
using DashboardWebApi.Services.Interfaces;


namespace DashboardWebApi.Controllers
{
    [Route("api/sales")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        public SalesController(ISaleRepostory salesRepository, ISaleAnalysisRepository saleAnalysisRepo, IMapper mapper)
        {
            _salesRepository = salesRepository;
            _saleAnalysisRepository = saleAnalysisRepo;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetSales()
        {
            IEnumerable<Sale> saleFromRepo = _salesRepository.GetSales();
            SaleDto saleDto = new SaleDto
            {
                Sales = saleFromRepo,
                TopSales = await _saleAnalysisRepository.GetTopSales(5),
                SaleProfitByDates = await _saleAnalysisRepository.GetSaleProfitByDate(),
                CompletedReturnedRatios = await _saleAnalysisRepository.GetSaleStatus()
            };
            return Ok(saleDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSale(Guid id)
        {
            Sale saleFromRepo = _salesRepository.GetSale(id);

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
            IEnumerable<Sale> saleFromRepo = _salesRepository.GetSales();
            await patchDoc.ModifyPatchPath(saleFromRepo.Count());

            IEnumerable<SaleForUpdateDto> saleCollectionDto =
                _mapper.Map<IEnumerable<SaleForUpdateDto>>(saleFromRepo);
            patchDoc.ApplyTo(saleCollectionDto);
            List<Sale> updatedSaleCollection = _mapper.Map<List<Sale>>(saleCollectionDto);

            foreach(Sale s in updatedSaleCollection)
            {
                if(_salesRepository.SaleExists(s))
                {
                    _salesRepository.UpdateSale(s);
                }
                else
                {
                    _salesRepository.AddSale(s);
                }
            }

            _salesRepository.RemoveSale(updatedSaleCollection);

            if (!_salesRepository.Save())
            {
                throw new Exception("Patching sale collection failed on save");
            }
        
            return NoContent();
        }

        private readonly ISaleRepostory _salesRepository;
        private readonly ISaleAnalysisRepository _saleAnalysisRepository;
        private readonly IMapper _mapper;
    }
}
