using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashboardWebApi.DTOs;
using DashboardWebApi.Entities;
using DashboardWebApi.Services.Interfaces;

namespace DashboardWebApi.Services
{
    public class SaleAnalysisRepository : ISaleAnalysisRepository
    {
        public SaleAnalysisRepository(DashboardContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SaleStatusDto>> GetSaleStatus()
        {
            IDictionary<string, int> completedReturnedDic = new Dictionary<string, int>();

            foreach (Sale s in _sales)
            {
                string status = s.Status;
                if (completedReturnedDic.ContainsKey(status))
                {
                    completedReturnedDic[status]++;
                }
                else
                {
                    completedReturnedDic.Add(s.Status, 1);
                }
            }
            IEnumerable<SaleStatusDto> completedReturnedList = completedReturnedDic
                .Select(x => new SaleStatusDto { Status = x.Key, Number = x.Value });
            return completedReturnedList;
        }

        public async Task<IEnumerable<SaleProfitByDateDto>> GetSaleProfitByDate()
        {
            IDictionary<string, SaleProfitByDateDto> lastTwelveMonths = Enumerable
                .Range(0, 12)
                .Select(i => DateTime.Now.AddMonths(i - 12))
                .Select(date => date.ToString("MM/yyyy"))
                .ToDictionary(date => date, date => new SaleProfitByDateDto { Date = date });
            foreach (Sale s in _sales)
            {
                string monthYear = s.DateSold.ToString("MM/yyyy");
                if (lastTwelveMonths.ContainsKey(monthYear))
                {
                    lastTwelveMonths[monthYear].Sale += s.SoldPrice;
                    lastTwelveMonths[monthYear].Profit += s.NetProfit;
                }
            }
            IEnumerable<SaleProfitByDateDto> lastTwelveMonthsList = lastTwelveMonths
                .Values
                .OrderBy(x => x.Date)
                .ToList();

            return lastTwelveMonthsList;
        }

        public async Task<IEnumerable<TopSaleDto>> GetTopSales(int n)
        {
            IDictionary<string, int> saleDic = new Dictionary<string, int>();
            foreach (Sale sale in _sales)
            {
                if (saleDic.ContainsKey(sale.Product))
                {
                    saleDic[sale.Product] += sale.Quantity;
                }
                else
                {
                    saleDic.Add(sale.Product, sale.Quantity);
                }
            }
            IEnumerable<TopSaleDto> topNSaleList = saleDic
                .OrderByDescending(s => s.Value)
                .Take(n)
                .Select(s => new TopSaleDto { Product = s.Key, Quantity = s.Value });

            return topNSaleList;
        }

        private readonly DashboardContext _context;
        private IEnumerable<Sale> _sales => _context.Sales;
    }
}
