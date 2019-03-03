using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return Sales;
        }

        public Sale GetSale(Guid id)
        {
            return Sales.FirstOrDefault(s => s.Id == id);
        }

        private DashboardContext _context;
        private IEnumerable<Sale> Sales => _context.Sales;
    }
}
