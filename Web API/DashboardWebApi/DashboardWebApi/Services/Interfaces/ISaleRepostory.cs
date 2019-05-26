using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;

namespace DashboardWebApi.Services
{
    public interface ISaleRepostory
    {
        Task<IEnumerable<Sale>> GetSales();
        Task<Sale> GetSale(Guid id);
        Task AddSale(Sale sale);
        Task UpdateSale(Sale sale);
        Task RemoveSale(IList<Sale> removeFromSaleCollection);
        Task<bool> SaleExists(Sale sale);
        Task<bool> Save();
    }
}
