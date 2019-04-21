using System.Collections.Generic;

using DashboardWebApi.Entities;

namespace DashboardWebApi.DTOs
{
    public class SaleDto
    {
        public IEnumerable<Sale> Sales { get; set; }
        public IEnumerable<SaleProfitByDateDto> SaleProfitByDates { get; set; }
        public IEnumerable<TopSaleDto> TopSales { get; set; }
        public IEnumerable<CompletedReturnedRatioDto> CompletedReturnedRatios { get; set; }
    }
}
