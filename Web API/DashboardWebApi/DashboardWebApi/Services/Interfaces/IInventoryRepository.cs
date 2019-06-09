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
        Task<Inventory> GetInventory(Inventory inventory);
        Task UpsertInventories(IEnumerable<Inventory> inventories);
        Task RemoveInventory(IEnumerable<Inventory> updatedInventories);
        Task<bool> Save();
    }
}
