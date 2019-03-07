using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashboardWebApi.Entities
{
    public class DashboardContext : DbContext
    {
        public DashboardContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Sale> Sales { get; set; }
        //public DbSet<Inventory> Inventories { get; set; }
    }
}
