using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DashboardWebApi.Entities;

namespace DashboardWebApi.Services
{
    public interface ISalesRepostory
    {
        IEnumerable<Sales> GetSales();
    }
}
