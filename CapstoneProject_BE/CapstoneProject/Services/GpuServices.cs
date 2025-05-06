using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.Gpu;
using CapstoneProject.DTOs.PowerSupply;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class GpuServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public GpuServices(ApplicationDbContext context, ImageService imageService) 
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

            public async Task<bool> AddNewAsync(AddGpuDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "gpu");
            }
            var newGpu = new Gpu()
            {
                GpuId = Guid.NewGuid(),
                Name = dto.Name,
                Chipset = dto.Chipset,
                Vram = dto.Vram,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                Tdp = dto.Tdp,
                PcieVersion = dto.PcieVersion,
                ReleaseYear = dto.ReleaseYear,
                Description = dto.Description,
                Image= webPath,
                ManufacturerId = dto.ManufacturerId,
            };
            _context.Gpus.Add(newGpu);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveGpuDto dto)
        {
            var currentGpu = await _context.Gpus.FirstOrDefaultAsync(p => p.GpuId == id);
            if (currentGpu == null) { throw new KeyNotFoundException("Graphic Card not Found"); }
            //Cattura immagine
            string webPath = currentGpu.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentGpu.Image!, "gpu");
            }
            currentGpu.Image = webPath;
            currentGpu.Name = dto.Name;
            currentGpu.Chipset = dto.Chipset;
            currentGpu.Vram = dto.Vram;
            currentGpu.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentGpu.Tdp = dto.Tdp;
            currentGpu.PcieVersion = dto.PcieVersion;
            currentGpu.ReleaseYear = dto.ReleaseYear;
            currentGpu.Description = dto.Description;
            currentGpu.ManufacturerId = dto.ManufacturerId;
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentGpu = await _context.Gpus.FirstOrDefaultAsync(p => p.GpuId == id);
            if (currentGpu == null) { throw new KeyNotFoundException("Graphic Card not found"); }

            if (!string.IsNullOrWhiteSpace(currentGpu.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentGpu.Image);
            }
            _context.Gpus.Remove(currentGpu);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetGpuDto>> GetAllGpuAsync(GpuQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryGpus = _context.Gpus.Include(p => p.Manufacturer).AsQueryable();

            if (queryParams.Manufacturer.HasValue)
            {
                queryGpus = queryGpus.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryGpus = queryGpus.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryGpus = queryGpus.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryGpus = queryGpus.Where(p => p.Name.ToLower().Contains(searchString) || p.Chipset.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.Name) : queryGpus.OrderBy(p => p.Name);
                    break;
                case "chipset":
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.Chipset) : queryGpus.OrderBy(p => p.Chipset);
                    break;
                case "vram":
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.Vram) : queryGpus.OrderBy(p => p.Vram);
                    break;
                case "tdp":
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.Tdp) : queryGpus.OrderBy(p => p.Tdp);
                    break;
                case "price":
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.Price) : queryGpus.OrderBy(p => p.Price);
                    break;
                default:
                    queryGpus = queryParams.SortDir == "desc" ? queryGpus.OrderByDescending(p => p.ReleaseYear) : queryGpus.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryGpus.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryGpus
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetGpuDto
                {
                    Id = c.GpuId,
                    Name = c.Name,
                    Chipset = c.Chipset,
                    Vram = c.Vram,
                    Price = c.Price,
                    Tdp = c.Tdp,
                    Image = c.Image,
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetGpuDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailGpuDto>? GetGpuDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Gpus.Include(p => p.Manufacturer).FirstOrDefaultAsync(p => p.GpuId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Graphic Card not found"); }

            var reqGpu = new DetailGpuDto()
            {
                GpuId = CurrentItem.GpuId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                Chipset = CurrentItem.Chipset,
                Vram = CurrentItem.Vram,
                Tdp = CurrentItem.Tdp,
                PcieVersion = CurrentItem.PcieVersion,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
            };
            return reqGpu;
        }

        public async Task<List<BackOfficeGpuDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeGpuDto>();
            var list = await _context.Gpus.Include(p => p.Manufacturer).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeGpuDto()
            {
                GpuId = i.GpuId,
                Name = i.Name,
                Price = i.Price,
                Chipset = i.Chipset,
                Vram = i.Vram,
                Tdp = i.Tdp,
                PcieVersion = i.PcieVersion,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
            }).ToList();
            return AllItemList;
        }

    }
    }

