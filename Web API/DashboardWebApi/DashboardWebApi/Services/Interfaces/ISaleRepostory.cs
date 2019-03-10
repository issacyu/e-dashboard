using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;

namespace DashboardWebApi.Services
{
    public interface ISaleRepostory
    {
        IEnumerable<Sale> GetSales();
        Sale GetSale(Guid id);
        void AddSale(Sale sale);
        void UpdateSale(Sale sale);
        void RemoveSale(IList<Sale> removeFromSaleCollection);
        bool SaleExists(Sale sale);
        bool Save();
    }
}
