using AutoMapper;

using DashboardWebApi.Entities;
using DashboardWebApi.DTOs;

namespace DashboardWebApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Sale, SaleForUpdateDto>();
            CreateMap<Sale, SaleDto>();
            CreateMap<SaleForUpdateDto, Sale>();
            CreateMap<Inventory, InventoryDto>();
            CreateMap<InventoryDto, Inventory>();
        }
    }
}
