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
using Microsoft.AspNetCore.JsonPatch.Operations;

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

            ModifyPatchPath(patchDoc, _inventoryRepository.GetInventories().Count());

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

        /// <summary>
        /// Handle the edge case when adding new row to any data grid.
        /// When adding new row to a grid, the path in patchDoc should
        /// be "/-"(it means adding new array item to the end of array).
        /// </summary>
        /// <param name="patchDoc">The json patch document.</param>
        private void ModifyPatchPath(JsonPatchDocument<IEnumerable<InventoryForUpdateViewModel>> patchDoc, int collectionSize)
        {
            foreach (Operation operation in patchDoc.Operations)
            {
                int index = 0;
                if (operation.OperationType.ToString() == "Add" && int.TryParse(operation.path.Split("/")[1], out index))
                {
                    if (index >= collectionSize)
                    {
                        operation.path = "/-";
                    }
                }
            }
        }

        private IInventoryRepository _inventoryRepository;
    }
}
