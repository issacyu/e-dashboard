using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services.Interfaces
{
    public interface IInventoryRepository
    {
        Task<IEnumerable<Inventory>> GetInventories();
        Task<Inventory> GetInventory(Guid id);
        Task AddInventory(Inventory inventory);
        Task UpdateInventory(Inventory inventory);
        Task RemoveInventory(IEnumerable<Inventory> removeFromInventoryCollection);
        Task<bool> InventoryExists(Inventory inventory);
        Task<bool> Save();
    }
}
