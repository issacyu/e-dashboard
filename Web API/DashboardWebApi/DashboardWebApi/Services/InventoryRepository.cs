using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;

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

        public async Task AddInventory(Inventory inventory)
        {
            _context.Inventories.Add(inventory);
        }

        public async Task UpdateInventory(Inventory inventory)
        {
            Inventory inven = _context.Inventories.FirstOrDefault(i => Equals(i.Id, inventory.Id));

            // I have to remove the inventory and add the moddify version back to the collection
            // in order to notify EF that the state of the inventory is change. Is it a bug?
            // Using State.Modified throws an exception because a inventory with the same id 
            // is already existed.
            _context.Remove(inven);
            _context.Add(inventory);
        }

        public async Task RemoveInventory(IEnumerable<Inventory> removeFromInventoryCollection)
        {
            foreach (Inventory i in _inventories)
            {
                Inventory inven = removeFromInventoryCollection.FirstOrDefault(x => Equals(x.Id, i.Id));
                if (inven == null)
                {
                    _context.Remove(i);
                }
            }
        }

        public async Task<bool> InventoryExists(Inventory inventory)
        {
            return _context.Inventories.FirstOrDefault(i => Equals(i.Id, inventory.Id)) != null;
        }

        public async Task<bool> Save()
        {
            return _context.SaveChanges() >= 0; ;
        }

        private DashboardContext _context;
        private IEnumerable<Inventory> _inventories => _context.Inventories;       
    }
}
