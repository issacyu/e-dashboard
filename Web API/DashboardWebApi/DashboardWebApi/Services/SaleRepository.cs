using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.DTOs;
using DashboardWebApi.Entities;

namespace DashboardWebApi.Services
{
    public class SaleRepository : ISaleRepostory
    {
        public SaleRepository(DashboardContext context)
        {
            _context = context;
        }

        public IEnumerable<Sale> GetSales()
        {
            return _sales;
        }

        public Sale GetSale(Guid id)
        {
            return _sales.FirstOrDefault(s => s.Id == id);
        }


        public void AddSale(Sale sale)
        {
            _context.Sales.Add(sale);
        }

        public void UpdateSale(Sale sale)
        {
            Sale sa = _context.Sales.FirstOrDefault(s => Equals(s.Id, sale.Id));

            // I have to remove the sale and add the moddify version back to the collection
            // in order to notify EF that the state of the sale is change. Is it a bug?
            // Using State.Modified throws an exception because a sale with the same id 
            // is already existed.
            _context.Remove(sa);
            _context.Add(sale);
        }

        public void RemoveSale(IList<Sale> removeFromSaleCollection)
        {
            foreach(Sale s in _sales)
            {
                Sale sa = removeFromSaleCollection.FirstOrDefault(x => Equals(x.Id, s.Id));
                if(sa == null)
                {
                    _context.Remove(s);
                }
            }
        }

        public bool SaleExists(Sale sale)
        {
            return _context.Sales.FirstOrDefault(s => Equals(s.Id, sale.Id)) != null;
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }

        /// <summary>
        /// Get top N product from sales.
        /// </summary>
        /// <param name="sales">The sale collection.</param>
        /// <param name="n">The top N number.</param>
        /// <returns>Top N sale.</returns>
        public async Task<IEnumerable<TopSaleDto>> GetTopSales(IEnumerable<Sale> sales, int n)
        {
            IDictionary<string, int> saleDic = new Dictionary<string, int>();
            foreach (Sale sale in sales)
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

        public async Task<IEnumerable<SaleStatusDto>> GetSaleStatus(IEnumerable<Sale> sales)
        {
            IDictionary<string, int> completedReturnedDic = new Dictionary<string, int>();

            foreach (Sale s in sales)
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

        public async Task<IEnumerable<SaleProfitByDateDto>> GetSaleProfitByDate(IEnumerable<Sale> sales)
        {
            IDictionary<string, SaleProfitByDateDto> lastTwelveMonths = Enumerable
                .Range(0, 12)
                .Select(i => DateTime.Now.AddMonths(i - 12))
                .Select(date => date.ToString("MM/yyyy"))
                .ToDictionary(date => date, date => new SaleProfitByDateDto { Date = date });
            foreach (Sale s in sales)
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

        private DashboardContext _context;
        private IEnumerable<Sale> _sales => _context.Sales;
    }
}
