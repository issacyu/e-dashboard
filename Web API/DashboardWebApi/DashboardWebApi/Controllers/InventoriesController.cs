using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using DashboardWebApi.Services;
using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;

namespace DashboardWebApi.Controllers
{
    [Route("api/inventories")]
    public class InventoriesController : Controller
    {
        public InventoriesController(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        [HttpGet()]
        public IActionResult GetInventories()
        {
            IEnumerable<Inventory> inventoryFromRepo = _inventoryRepository.GetInventories();

            IEnumerable<InventoryViewModel> inventories = Mapper.Map<IEnumerable<InventoryViewModel>>(inventoryFromRepo);
            return Ok(inventories);
        }

        private IInventoryRepository _inventoryRepository;
    }
}
