using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services
{
    public class SaleRepository : ISaleRepostory
    {
        public SaleRepository(DashboardContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sale>> GetSales()
        {
            return _sales;
        }

        public async Task<Sale> GetSale(Guid id)
        {
            return _sales.FirstOrDefault(s => s.Id == id);
        }

        public async Task UpsertSales(IEnumerable<Sale> sales)
        {
            foreach (Sale sale in sales)
            {
                Sale existingSale = await GetSale(sale);

                if (existingSale != null)
                {
                    _context.Sales.Update(sale);
                }
                else
                {
                    await _context.Sales.AddAsync(sale);
                }
            }
        }

        public async Task RemoveSale(IEnumerable<Sale> updatedSales)
        {
            IDictionary<Guid, int> updatedSalesDic = updatedSales.ToDictionary(s => s.Id, s => 0);
            foreach (Sale s in _sales)
            {
                if(!updatedSalesDic.ContainsKey(s.Id))
                    _context.Sales.Remove(s);
            }
        }

        public async Task<Sale> GetSale(Sale sale)
        {
            return await _context.Sales
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == sale.Id);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        private DashboardContext _context;
        private IEnumerable<Sale> _sales => _context.Sales.AsNoTracking();
    }
}
