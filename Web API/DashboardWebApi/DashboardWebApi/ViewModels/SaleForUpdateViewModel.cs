using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DashboardWebApi.ViewModels
{
    public class SaleForUpdateViewModel
    {
        public DateTime DateSold { get; set; }

        public string Product { get; set; }

        public int Quantity { get; set; }

        public decimal SoldPrice { get; set; }

        public decimal ShippingCharged { get; set; }

        public decimal ShippingHandlingFee { get; set; }

        public decimal AmazonFee { get; set; }

        public decimal CreditCardFee { get; set; }

        public decimal CostPerItem { get; set; }

        public decimal OtherCost { get; set; }

        public decimal TotalCost { get; set; }

        public decimal NetProfit { get; set; }
    }
}
