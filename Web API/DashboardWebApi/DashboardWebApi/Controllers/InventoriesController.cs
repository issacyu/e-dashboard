using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Cors;

using DashboardWebApi.Services;
using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;


namespace DashboardWebApi.Controllers
{
    [EnableCors("CorsPolicy")]
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

        [HttpGet("{id}")]
        public IActionResult GetInventory(Guid id)
        {
            Inventory inventoryFromRepo = _inventoryRepository.GetInventory(id);

            if (inventoryFromRepo == null)
            {
                return BadRequest();
            }

            InventoryViewModel inventory = Mapper.Map<InventoryViewModel>(inventoryFromRepo);
            return Ok(inventory);
        }

        [HttpPatch("inventorycollection")]
        public IActionResult PartiallyUpdateInventoryCollection([FromBody] JsonPatchDocument<IEnumerable<InventoryForUpdateViewModel>> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            IEnumerable<Inventory> inventoryCollectionFromRepo = _inventoryRepository.GetInventories();
            IEnumerable<InventoryForUpdateViewModel> inventoryCollectionViewModel = Mapper.Map<IEnumerable<InventoryForUpdateViewModel>>(inventoryCollectionFromRepo);
            patchDoc.ApplyTo(inventoryCollectionViewModel);
            IEnumerable<Inventory> updatedInventoryCollection = Mapper.Map<IEnumerable<Inventory>>(inventoryCollectionViewModel);

            foreach(Inventory i in updatedInventoryCollection)
            {
                if(_inventoryRepository.InventoryExists(i))
                {
                    _inventoryRepository.UpdateInventory(i);
                }
                else
                {
                    _inventoryRepository.AddInventory(i);
                }
            }

            _inventoryRepository.RemoveInventory(updatedInventoryCollection);

            if(!_inventoryRepository.Save())
            {
                throw new Exception("Patching inventory collection failed on save.");
            }

            return NoContent();
        }

        private IInventoryRepository _inventoryRepository;
    }
}
