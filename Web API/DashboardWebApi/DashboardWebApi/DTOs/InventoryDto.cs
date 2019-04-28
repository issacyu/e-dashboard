using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashboardWebApi.Entities;

namespace DashboardWebApi.DTOs
{
    public class InventoryDto
    {
        public IEnumerable<Inventory> Inventories { get; set; }
        public IEnumerable<CategoryDto> Categories { get; set; }
    }
}
