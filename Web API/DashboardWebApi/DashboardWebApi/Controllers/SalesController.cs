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
        public SalesController(ISalesRepostory salesRepostory)
        {
            _salesRepostory = salesRepostory;
        }

        [HttpGet()]
        public IActionResult GetSales()
        {
            var salesFromRepo = _salesRepostory.GetSales();

            IEnumerable<SalesViewModel> sales = Mapper.Map<IEnumerable<SalesViewModel>>(salesFromRepo);
            return Ok(sales);
        }

        private ISalesRepostory _salesRepostory;
    }
}
