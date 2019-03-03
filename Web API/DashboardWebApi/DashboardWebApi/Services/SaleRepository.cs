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

        private DashboardContext _context;
        private IEnumerable<Sale> Sales => _context.Sales;
    }
}
