using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

using DashboardWebApi.Services;
using DashboardWebApi.Services.Interfaces;
using DashboardWebApi.Entities;
using DashboardWebApi.ViewModels;
using Microsoft.AspNetCore.Http;

namespace DashboardWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<DashboardContext>(x => x.UseSqlServer(connectionString));

            // Register the repository.
            services.AddScoped<ISaleRepostory, SaleRepository>();
            services.AddScoped<IInventoryRepository, InventoryRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();

                // Global exception handling.
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected error happened. Try again later.");
                    });
                });
            }

            // AutoMapper configuration for entities and view models.
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Sale, SaleViewModel>();
                cfg.CreateMap<Sale, SaleForUpdateViewModel>();
                cfg.CreateMap<SaleForUpdateViewModel, Sale>();
                cfg.CreateMap<Inventory, InventoryViewModel>();
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
