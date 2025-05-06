using System.Data;
using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CapstoneProject.Services
{
    public class CpuServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public CpuServices(ApplicationDbContext context, ImageService imageService)
        {
            _context = context;
            _imageService = imageService;
        }
        private async Task<bool> SaveAsync()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Log.Warning(ex, ex.Message);
                return false;
            }
        }

        public async Task<bool> AddNewAsync(AddCpuDto addCpuDto)
        {
            //Image IformFile To String
            string webPath = null;
            if (addCpuDto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(addCpuDto.Image , "cpu");
            }
            var newCpu = new Cpu()
            {
                CpuId = Guid.NewGuid(),
                Name = addCpuDto.Name,
                Cores = addCpuDto.Cores,
                Threads = addCpuDto.Threads,
                BaseClock = Math.Round(decimal.Parse(addCpuDto.BaseClock, CultureInfo.InvariantCulture), 2),
                BoostClock = Math.Round(decimal.Parse(addCpuDto.BoostClock, CultureInfo.InvariantCulture), 2),
                Tdp = addCpuDto.Tdp,
                IntegratedGraphics = addCpuDto.IntegratedGraphics,
                ReleaseYear = addCpuDto.ReleaseYear,
                Price = Math.Round(decimal.Parse(addCpuDto.Price, CultureInfo.InvariantCulture), 2),
                Description = addCpuDto.Description != null ? addCpuDto.Description : "",
                Image = webPath,
                ManufacturerId = addCpuDto.ManufacturerId,
                SocketId = addCpuDto.SocketId,
            };
            _context.Add(newCpu);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveCpuDto editSaveCpuDto)
        {
            var currentCpu = await _context.Cpus.FirstOrDefaultAsync(p=> p.CpuId == id);
            if (currentCpu == null) { throw new Exception("Cpu not Found"); }
            //Cattura immagine
            string webPath = currentCpu.Image!;
            if (editSaveCpuDto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(editSaveCpuDto.Image, currentCpu.Image!, "cpu");
            }
            //Edit dei campi
            currentCpu.Image = webPath;
            currentCpu.Name = editSaveCpuDto.Name;
            currentCpu.Cores = editSaveCpuDto.Cores;
            currentCpu.Threads = editSaveCpuDto.Threads;
            currentCpu.BaseClock = Math.Round(decimal.Parse(editSaveCpuDto.BaseClock, CultureInfo.InvariantCulture),1);
            currentCpu.BoostClock = Math.Round(decimal.Parse(editSaveCpuDto.BoostClock, CultureInfo.InvariantCulture),1);
            currentCpu.Tdp = editSaveCpuDto.Tdp;
            currentCpu.IntegratedGraphics = editSaveCpuDto.IntegratedGraphics;
            currentCpu.ReleaseYear = editSaveCpuDto.ReleaseYear;
            currentCpu.Price = Math.Round(decimal.Parse(editSaveCpuDto.Price, CultureInfo.InvariantCulture), 2);
            currentCpu.Description = editSaveCpuDto.Description;
            currentCpu.ManufacturerId = editSaveCpuDto.ManufacturerId;
            currentCpu.SocketId = editSaveCpuDto.SocketId;
            return await SaveAsync();
        }

        public async Task<bool> DeleteCpuAsync(Guid id)
        {
            var currentCpu = await _context.Cpus.FirstOrDefaultAsync(p => p.CpuId == id);
            if (currentCpu == null) { throw new KeyNotFoundException("Cpu not found"); }

            if (!string.IsNullOrWhiteSpace(currentCpu.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentCpu.Image);
            }
            _context.Cpus.Remove(currentCpu);
            return await SaveAsync();
        }
        //HERE
        public async Task<PagedResultDto<SingleGetCpuDto>> GetAllCpuAsync(CpuQueryParamsDto queryParams)
           
        {
            //rimane in attesa di essere queryzzata
            var queryCpus = _context.Cpus.Include(p=> p.Manufacturer).Include(p=>p.Socket).AsQueryable();

            if (queryParams.CkSocket.HasValue)
            {
                var mobo = await _context.Motherboards.AsNoTracking().FirstOrDefaultAsync(m => m.MotherboardId == queryParams.CkSocket.Value);
                if (mobo != null)
                {
                    queryCpus = queryCpus.Where(p => p.SocketId == mobo.SocketId);
                }
            }
            if (queryParams.Manufacturer.HasValue)
            {
                queryCpus = queryCpus.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.Socket.HasValue)
            {
                queryCpus = queryCpus.Where(p => p.SocketId == queryParams.Socket);
            }
            if (queryParams.minPrice.HasValue) 
            {
                queryCpus = queryCpus.Where(p=> p.Price >=  queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryCpus = queryCpus.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (!string.IsNullOrEmpty(queryParams.Search))
                //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryCpus = queryCpus.Where(p=> p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.Name) : queryCpus.OrderBy(p => p.Name);
                    break;
                case "baseclock":
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.BaseClock) : queryCpus.OrderBy(p => p.BaseClock);
                    break;
                case "boostclock":
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.BoostClock) : queryCpus.OrderBy(p => p.BoostClock);
                    break;
                case "tdp":
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.Tdp) : queryCpus.OrderBy(p => p.Tdp);
                    break;
                case "price":
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.Price) : queryCpus.OrderBy(p => p.Price);
                    break;
                default:
                    queryCpus = queryParams.SortDir == "desc" ? queryCpus.OrderByDescending(p => p.ReleaseYear) : queryCpus.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryCpus.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryCpus
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetCpuDto
                 {
                Id = c.CpuId,
                Name = c.Name,
                Price = c.Price,
                Cores = c.Cores,
                Tdp = c.Tdp,
                BaseClock = c.BaseClock,
                BoostClock = c.BoostClock,
                Image = c.Image,
                Socket = c.Socket.Name
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetCpuDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailCpuDto>? GetCpuDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Cpus.Include(p=>p.Manufacturer).Include(p => p.Socket).FirstOrDefaultAsync(p=>p.CpuId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Cpu not found"); }

            var reqCpu = new DetailCpuDto()
            {
                    CpuId = CurrentItem.CpuId,
                    Name = CurrentItem.Name,
                    Price = CurrentItem.Price,
                    Cores = CurrentItem.Cores,
                    Threads = CurrentItem.Threads,
                    BaseClock = CurrentItem.BaseClock,
                    BoostClock = CurrentItem.BoostClock,
                    Tdp = CurrentItem.Tdp,
                    IntegratedGraphics = CurrentItem.IntegratedGraphics,
                    ReleaseYear = CurrentItem.ReleaseYear,
                    Description = CurrentItem.Description,
                    Image = CurrentItem.Image,
                    Manufacturer = CurrentItem.Manufacturer.Name,
                    Socket = CurrentItem.Socket.Name
            };
            return reqCpu;
        }


        public async Task<List<BackOfficeCpuDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeCpuDto>();
            var list = await _context.Cpus.Include(p => p.Manufacturer).Include(p => p.Socket).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeCpuDto()
            {
                CpuId = i.CpuId,
                Name = i.Name,
                Price = i.Price,
                Cores = i.Cores,
                Threads = i.Threads,
                BaseClock = i.BaseClock,
                BoostClock = i.BoostClock,
                Tdp = i.Tdp,
                IntegratedGraphics = i.IntegratedGraphics,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto(){
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
                Socket = new SingleSupportItemDto() 
                {
                    Id = i.Socket.SocketId,
                    Name = i.Socket.Name
                }
            }).ToList();
            return AllItemList;
        }



























    }
}
