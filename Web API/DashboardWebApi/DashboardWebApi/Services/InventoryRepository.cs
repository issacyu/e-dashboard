using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace DashboardWebApi.Services
{
    public class InventoryRepository : IInventoryRepository
    {
        public InventoryRepository(DashboardContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Inventory>> GetInventories()
        {
            return _inventories;
        } 

        public async Task<Inventory> GetInventory(Guid id)
        {
            return _inventories.FirstOrDefault(i => Equals(i.Id, id));
        }

        public async Task UpsertInventories(IEnumerable<Inventory> inventories)
        {
            foreach (Inventory inventory in inventories)
            {
                Inventory existingInventory = await GetInventory(inventory);

                if (existingInventory != null)
                {
                    _context.Inventories.Update(inventory);
                }
                else
                {
                    await _context.Inventories.AddAsync(inventory);
                }
            }
        }

        public async Task RemoveInventory(IEnumerable<Inventory> updatedInventories)
        {
            IDictionary<Guid, int> updatedInventoriesDic = updatedInventories.ToDictionary(s => s.Id, s => 0);
            foreach (Inventory i in _inventories)
            {
                if (!updatedInventoriesDic.ContainsKey(i.Id))
                    _context.Inventories.Remove(i);
            }
        }

        public async Task<Inventory> GetInventory(Inventory inventory)
        {
            return await _context.Inventories
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == inventory.Id);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() >= 0; ;
        }

        private DashboardContext _context;
        private IEnumerable<Inventory> _inventories => _context.Inventories.AsNoTracking();       
    }
}
