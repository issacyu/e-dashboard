using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using DashboardWebApi.Services;
using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;

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
            var salesFromRepo = _salesRepostory.GetSales();

            IEnumerable<SaleViewModel> sales = Mapper.Map<IEnumerable<SaleViewModel>>(salesFromRepo);
            return Ok(sales);
        }

        private ISaleRepostory _salesRepostory;
    }
}
