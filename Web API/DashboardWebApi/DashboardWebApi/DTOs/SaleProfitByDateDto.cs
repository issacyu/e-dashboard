namespace DashboardWebApi.DTOs
{
    public class SaleProfitByDateDto
    {
        public string Date { get; set; }
        public decimal Sale { get; set; }
        public decimal Profit { get; set; }
    }
}
