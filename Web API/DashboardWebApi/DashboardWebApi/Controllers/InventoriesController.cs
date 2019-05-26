using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Cors;

using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;
using DashboardWebApi.Extensions;

namespace DashboardWebApi.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/inventories")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        public InventoriesController(IInventoryRepository inventoryRepository, IMapper mapper)
        {
            _inventoryRepository = inventoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetInventories()
        {
            IEnumerable<Inventory> inventoryFromRepo = _inventoryRepository.GetInventories();

            return Ok(inventoryFromRepo);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInventory(Guid id)
        {
            Inventory inventoryFromRepo = _inventoryRepository.GetInventory(id);

            if (inventoryFromRepo == null)
            {
                return BadRequest();
            }

            InventoryDto inventory = _mapper.Map<InventoryDto>(inventoryFromRepo);
            return Ok(inventory);
        }

        [HttpPatch("inventorycollection")]
        public async Task<IActionResult> PartiallyUpdateInventoryCollection([FromBody] JsonPatchDocument<IEnumerable<InventoryForUpdateDto>> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            await patchDoc.ModifyPatchPath(_inventoryRepository.GetInventories().Count());

            IEnumerable<Inventory> inventoryCollectionFromRepo = _inventoryRepository.GetInventories();
            IEnumerable<InventoryForUpdateDto> inventoryCollectionViewModel = _mapper.Map<IEnumerable<InventoryForUpdateDto>>(inventoryCollectionFromRepo);
            patchDoc.ApplyTo(inventoryCollectionViewModel);
            IEnumerable<Inventory> updatedInventoryCollection = _mapper.Map<IEnumerable<Inventory>>(inventoryCollectionViewModel);

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

        private readonly IInventoryRepository _inventoryRepository;
        private readonly IMapper _mapper;
    }
}
