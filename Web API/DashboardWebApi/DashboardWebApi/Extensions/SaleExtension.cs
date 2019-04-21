using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;

namespace DashboardWebApi.Extensions
{
    public static class SaleExtension
    {
        /// <summary>
        /// Get top N product from sales.
        /// </summary>
        /// <param name="sales">The sale collection.</param>
        /// <param name="n">The top N number.</param>
        /// <returns>Top N sale.</returns>
        public static async Task<IEnumerable<TopSaleDto>> GetTopSales(this IEnumerable<Sale> sales, int n)
        {
            IDictionary<string, int> saleDic = new Dictionary<string, int>();
            foreach (Sale sale in sales)
            {
                if(saleDic.ContainsKey(sale.Product))
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
                .Select(s => new TopSaleDto{ Product = s.Key, Quantity = s.Value });

            return topNSaleList;
        }

        public static async Task<IEnumerable<CompletedReturnedRatioDto>> GetCompletedReturnedRatio(this IEnumerable<Sale> sales)
        {
            IDictionary<string, int> completedReturnedDic = new Dictionary<string, int>();

            foreach(Sale s in sales)
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
            IEnumerable<CompletedReturnedRatioDto> completedReturnedList = completedReturnedDic
                .Select(x => new CompletedReturnedRatioDto { Status = x.Key, Number = x.Value });
            return completedReturnedList;
        }

        public static async Task<IEnumerable<SaleProfitByDateDto>> GetSaleProfitByDate(this IEnumerable<Sale> sales)
        {
            IDictionary<string, SaleProfitByDateDto> lastTwelveMonths = Enumerable
                .Range(0, 12)
                .Select(i => DateTime.Now.AddMonths(i - 12))
                .Select(date => date.ToString("MM/yyyy"))
                .ToDictionary(date => date, date => new SaleProfitByDateDto { Date = date });
            foreach(Sale s in sales)
            {
                string monthYear = s.DateSold.ToString("MM/yyyy");
                if(lastTwelveMonths.ContainsKey(monthYear))
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
    }
}
