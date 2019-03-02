using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashboardWebApi.Controllers
{
    [Route("api/sales")]
    public class Sales : Controller
    {
        [HttpGet()]
        public IActionResult GetSales()
        {
            return null;
        }
    }
}
