using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.DTOs;

namespace DashboardWebApi.Services.Interfaces
{
    public interface ISaleAnalysisRepository
    {
        Task<IEnumerable<SaleStatusDto>> GetSaleStatus();
        Task<IEnumerable<SaleProfitByDateDto>> GetSaleProfitByDate();
        Task<IEnumerable<TopSaleDto>> GetTopSales(int n);
    }
}
