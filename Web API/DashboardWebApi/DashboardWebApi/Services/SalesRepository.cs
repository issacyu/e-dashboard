using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services
{
    public class SalesRepository : ISalesRepostory
    {
        public SalesRepository(DashboardContext context)
        {
            _context = context;
        }

        public IEnumerable<Sales> GetSales()
        {
            return Sales;
        }

        private DashboardContext _context;
        private IEnumerable<Sales> Sales => _context.Sales;
    }
}
