using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services
{
    public interface ISaleRepostory
    {
        Task<IEnumerable<Sale>> GetSales();
        Task<Sale> GetSale(Guid id);
        Task UpsertSales(IEnumerable<Sale> sales);
        Task RemoveSale(IEnumerable<Sale> updatedSales);
        Task<Sale> GetSale(Sale sale);
        Task<bool> Save();
    }
}
