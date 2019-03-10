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

        public IEnumerable<Inventory> GetInventories()
        {
            return _inventories;
        }

        public Inventory GetInventory(Guid id)
        {
            return _inventories.FirstOrDefault(i => Equals(i.Id, id));
        }

        private DashboardContext _context;
        private IEnumerable<Inventory> _inventories => _context.Inventories;       
    }
}
