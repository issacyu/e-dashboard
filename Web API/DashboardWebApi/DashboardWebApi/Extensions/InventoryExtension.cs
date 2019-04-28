using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.DTOs;
using DashboardWebApi.Entities;

namespace DashboardWebApi.Extensions
{
    public static class InventoryExtension
    {
        public static async Task<IEnumerable<CategoryDto>> GetCategories(this IEnumerable<Inventory> inventories)
        {
            IDictionary<string, int> categoryDic = new Dictionary<string, int>();
            foreach (Inventory inventory in inventories)
            {
                if (categoryDic.ContainsKey(inventory.Category))
                {
                    categoryDic[inventory.Category] += inventory.Quantity;
                }
                else
                {
                    categoryDic.Add(inventory.Category, inventory.Quantity);
                }
            }

            IEnumerable<CategoryDto> categories = categoryDic
                .Select(c => new CategoryDto {Category = c.Key, Quantity = c.Value});
            return categories;
        }
    }
}
