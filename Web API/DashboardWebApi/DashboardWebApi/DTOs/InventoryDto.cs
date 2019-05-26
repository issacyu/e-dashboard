using System;

namespace DashboardWebApi.DTOs
{
    public class InventoryDto
    {
        public Guid Id { get; set; }

        public string Product { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string Category { get; set; }

        public string Model { get; set; }

        public string Type { get; set; }

        public string Color { get; set; }

        public string Condition { get; set; }

        public string Manufacturer { get; set; }

        public decimal Fee { get; set; }

        public decimal Cost { get; set; }

        public decimal TotalCost { get; set; }
    }
}
