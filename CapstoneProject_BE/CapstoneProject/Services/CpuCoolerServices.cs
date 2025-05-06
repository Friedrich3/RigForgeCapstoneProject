using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.CpuCooler;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class CpuCoolerServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public CpuCoolerServices(ApplicationDbContext context, ImageService imageService)
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
        public async Task<bool> AddNewAsync(AddCoolerDto addCoolerDto)
        {
            string webPath = null;
            if (addCoolerDto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(addCoolerDto.Image, "cooler");
            }
            if(addCoolerDto.Type != CoolerType.Air && addCoolerDto.Type != CoolerType.Liquid)
            {
                return false;
            }
            var newCoolerGuid = Guid.NewGuid();
            var newCooler = new CpuCooler()
            {
                CpuCoolerId = newCoolerGuid,
                Name = addCoolerDto.Name,
                Type = addCoolerDto.Type,
                Tdp = addCoolerDto.Tdp,
                Price = Math.Round(decimal.Parse(addCoolerDto.Price, CultureInfo.InvariantCulture), 2),
                Description = addCoolerDto.Description,
                Image = webPath,
                ManufacturerId = addCoolerDto.ManufacturerId,
                CpuCoolerSockets = addCoolerDto.CompatibleSocketIds.Select(item => new CpuCoolerSocket()
                {
                    SocketId = item,
                }).ToList()
            };
            _context.Add(newCooler);

            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id,EditSaveCoolerDto editSaveCoolerDto)
        {
            var currentCooler = await _context.CpuCoolers.Include(c=> c.CpuCoolerSockets).FirstOrDefaultAsync(p => p.CpuCoolerId == id);
            if (currentCooler == null) { throw new Exception("Cooler not Found"); }
            //Cattura immagine
            string webPath = currentCooler.Image!;
            if (editSaveCoolerDto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(editSaveCoolerDto.Image, currentCooler.Image!, "cooler");
            }
            if (editSaveCoolerDto.Type != CoolerType.Air && editSaveCoolerDto.Type != CoolerType.Liquid)
            {
                throw new KeyNotFoundException("Cooler type not valid");
            }
            //Edit dei campi
            currentCooler.Image = webPath;
            currentCooler.Name = editSaveCoolerDto.Name;
            currentCooler.Type = editSaveCoolerDto.Type;
            currentCooler.Tdp = editSaveCoolerDto.Tdp;
            currentCooler.Price = Math.Round(decimal.Parse(editSaveCoolerDto.Price, CultureInfo.InvariantCulture), 2);
            currentCooler.Description = editSaveCoolerDto.Description;
            currentCooler.ManufacturerId = editSaveCoolerDto.ManufacturerId;

            //ClearDella tabella CoolerSocket legata all'id con Include per reinserimento nuovi dati
            currentCooler.CpuCoolerSockets.Clear();
            foreach (var item in editSaveCoolerDto.CompatibleSocketIds)
            {
                currentCooler.CpuCoolerSockets.Add(new CpuCoolerSocket
                {
                    CpuCoolerId = currentCooler.CpuCoolerId,
                    SocketId = item
                });
            }
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentCooler = await _context.CpuCoolers.FirstOrDefaultAsync(p => p.CpuCoolerId == id);
            if (currentCooler == null) { throw new KeyNotFoundException("Cooler not found"); }

            if (!string.IsNullOrWhiteSpace(currentCooler.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentCooler.Image);
            }
            _context.CpuCoolers.Remove(currentCooler);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetCoolerDto>> GetAllCoolerAsync(CoolerQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryCoolers = _context.CpuCoolers.Include(c => c.CpuCoolerSockets)!.ThenInclude(cs => cs.Socket).Include(p => p.Manufacturer).AsQueryable();

            if (queryParams.CkSocketCpu.HasValue)
            {
                var cpu = await _context.Cpus.AsNoTracking().FirstOrDefaultAsync(x => x.CpuId == queryParams.CkSocketCpu.Value);
                if (cpu != null)
                {
                    // Filtra i cooler che sono compatibili con il socket della CPU
                    queryCoolers = queryCoolers.Where(c =>c.CpuCoolerSockets!.Any(cs => cs.SocketId == cpu.SocketId));
                }
            }
            else if (queryParams.CkSocketMobo.HasValue)
            {
                var mobo = await _context.Motherboards.AsNoTracking().FirstOrDefaultAsync(x => x.MotherboardId == queryParams.CkSocketMobo.Value);
                if (mobo != null)
                {
                    // Filtra i cooler che sono compatibili con il socket della mobo
                    queryCoolers = queryCoolers.Where(c =>c.CpuCoolerSockets!.Any(cs => cs.SocketId == mobo.SocketId));
                }
            }

            if (queryParams.Manufacturer.HasValue)
            {
                queryCoolers = queryCoolers.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryCoolers = queryCoolers.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryCoolers = queryCoolers.Where(p => p.Price <= queryParams.maxPrice);
            }
            //PROVA
            if (!string.IsNullOrEmpty(queryParams.Type.ToString()))
            {
                queryCoolers = queryCoolers.Where(p => p.Type == queryParams.Type);
            }
            //
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryCoolers = queryCoolers.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryCoolers = queryParams.SortDir == "desc" ? queryCoolers.OrderByDescending(p => p.Name) : queryCoolers.OrderBy(p => p.Name);
                    break;
                case "type":
                    queryCoolers = queryParams.SortDir == "desc" ? queryCoolers.OrderByDescending(p => p.Type) : queryCoolers.OrderBy(p => p.Type);
                    break;
                case "tdp":
                    queryCoolers = queryParams.SortDir == "desc" ? queryCoolers.OrderByDescending(p => p.Tdp) : queryCoolers.OrderBy(p => p.Tdp);
                    break;
                default:
                    queryCoolers = queryParams.SortDir == "desc" ? queryCoolers.OrderByDescending(p => p.Price) : queryCoolers.OrderBy(p => p.Price);
                    break;
            }

            var totalcount = await queryCoolers.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryCoolers
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetCoolerDto
                {
                    Id = c.CpuCoolerId,
                    Name = c.Name,
                    Price = c.Price,
                    Type = c.Type,
                    Tdp = c.Tdp,
                    Image = c.Image,
                    Socket = c.CpuCoolerSockets.Select(item => new string(item.Socket.Name)).ToList(),
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetCoolerDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailCoolerDto>? GetCoolerDetailAsync(Guid id)
        {
            var CurrentItem = await _context.CpuCoolers.Include(p => p.Manufacturer).Include(p => p.CpuCoolerSockets)!.ThenInclude(p=> p.Socket).FirstOrDefaultAsync(p => p.CpuCoolerId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Cooler not found"); }

            var reqCooler = new DetailCoolerDto()
            {
                CpuCoolerId = CurrentItem.CpuCoolerId,
                Name = CurrentItem.Name,
                Type = CurrentItem.Type,
                Tdp = CurrentItem.Tdp,
                Price = CurrentItem.Price,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
                CompatibleSockets = CurrentItem.CpuCoolerSockets.Select(item => new string(item.Socket.Name)).ToList(),
            };
            return reqCooler;
        }

        public async Task<List<BackOfficeCoolerDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeCoolerDto>();
            var list = await _context.CpuCoolers.Include(p => p.Manufacturer).Include(p => p.CpuCoolerSockets)!.ThenInclude(p => p.Socket).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeCoolerDto()
            {
                CpuCoolerId = i.CpuCoolerId,
                Name = i.Name,
                Type = i.Type,
                Tdp = i.Tdp,
                Price = i.Price,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
                CompatibleSockets = i.CpuCoolerSockets.Select(item => new SingleSupportItemDto() { Id= item.Socket.SocketId, Name = item.Socket.Name}).ToList(),
            }).ToList();
            return AllItemList;
        }


    }
}
