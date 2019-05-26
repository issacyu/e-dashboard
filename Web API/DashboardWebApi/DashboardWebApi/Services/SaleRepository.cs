﻿using System;
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

        public async Task<IEnumerable<Sale>> GetSales()
        {
            return _sales;
        }

        public async Task<Sale> GetSale(Guid id)
        {
            return _sales.FirstOrDefault(s => s.Id == id);
        }


        public async Task AddSale(Sale sale)
        {
            _context.Sales.Add(sale);
        }

        public async Task UpdateSale(Sale sale)
        {
            Sale sa = _context.Sales.FirstOrDefault(s => Equals(s.Id, sale.Id));

            // I have to remove the sale and add the moddify version back to the collection
            // in order to notify EF that the state of the sale is change. Is it a bug?
            // Using State.Modified throws an exception because a sale with the same id 
            // is already existed.
            _context.Remove(sa);
            _context.Add(sale);
        }

        public async Task RemoveSale(IList<Sale> removeFromSaleCollection)
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

        public async Task<bool> SaleExists(Sale sale)
        {
            return _context.Sales.FirstOrDefault(s => Equals(s.Id, sale.Id)) != null;
        }

        public async Task<bool> Save()
        {
            return _context.SaveChanges() >= 0;
        }

        private DashboardContext _context;
        private IEnumerable<Sale> _sales => _context.Sales;
    }
}
