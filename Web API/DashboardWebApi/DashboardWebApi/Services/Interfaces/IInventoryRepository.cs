using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services.Interfaces
{
    public interface IInventoryRepository
    {
        IEnumerable<Inventory> GetInventories();
        Inventory GetInventory(Guid id);
    }
}
