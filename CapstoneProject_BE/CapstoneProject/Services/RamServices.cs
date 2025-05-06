using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.Ram;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class RamServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public RamServices(ApplicationDbContext context, ImageService imageService)
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

        public async Task<bool> AddNewAsync(AddRamDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "ram");
            }
            var newRam = new Ram()
            {
                RamId = Guid.NewGuid(),
                Name = dto.Name,
                Capacity = dto.Capacity,
                Modules = dto.Modules,
                Speed = dto.Speed,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                ReleaseYear = dto.ReleaseYear,
                Description = dto.Description,
                Image = webPath,
                ManufacturerId = dto.ManufacturerId,
                RamTypeId = dto.RamTypeId,
            };
            _context.Rams.Add(newRam);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveRamDto dto)
        {
            var currentRam = await _context.Rams.FirstOrDefaultAsync(p => p.RamId == id);
            if (currentRam == null) { throw new KeyNotFoundException("RAM not Found"); }
            //Cattura immagine
            string webPath = currentRam.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentRam.Image!, "ram");
            }
            currentRam.Image = webPath;
            currentRam.Name = dto.Name;
            currentRam.Capacity = dto.Capacity;
            currentRam.Modules = dto.Modules;
            currentRam.Speed = dto.Speed;
            currentRam.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentRam.ReleaseYear = dto.ReleaseYear;
            currentRam.Description = dto.Description;
            currentRam.ManufacturerId = dto.ManufacturerId;
            currentRam.RamTypeId = dto.RamTypeId;
            return await SaveAsync();

        }
        
        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentRam = await _context.Rams.FirstOrDefaultAsync(p => p.RamId == id);
            if (currentRam == null) { throw new KeyNotFoundException("RAM not found"); }

            if (!string.IsNullOrWhiteSpace(currentRam.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentRam.Image);
            }
            _context.Rams.Remove(currentRam);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetRamDto>> GetAllRamAsync(RamQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryRams = _context.Rams.Include(p => p.Manufacturer).Include(p => p.RamType).AsQueryable();

            //filtro pre-comp
            if (queryParams.CkRamType.HasValue)
            {
                var mobo = await _context.Motherboards.AsNoTracking().FirstOrDefaultAsync(m => m.MotherboardId == queryParams.CkRamType.Value);
                if (mobo != null)
                {
                    queryRams = queryRams.Where(p => p.RamTypeId == mobo.RamTypeId);
                }
            }

            if (queryParams.Manufacturer.HasValue)
            {
                queryRams = queryRams.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryRams = queryRams.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryRams = queryRams.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (queryParams.RamType.HasValue)
            {
                queryRams = queryRams.Where(p => p.RamTypeId == queryParams.RamType);
            }
            if (queryParams.MinCapacity.HasValue)
            {
                queryRams = queryRams.Where(p => p.Capacity >= queryParams.MinCapacity);
            }
            if (queryParams.MaxCapacity.HasValue)
            {
                queryRams = queryRams.Where(p => p.Capacity <= queryParams.MaxCapacity);
            }
            if (queryParams.MinSpeed.HasValue)
            {
                queryRams = queryRams.Where(p => p.Speed >= queryParams.MinSpeed);
            }
            if (queryParams.MaxSpeed.HasValue)
            {
                queryRams = queryRams.Where(p => p.Speed <= queryParams.MaxSpeed);
            }

            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryRams = queryRams.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.Name) : queryRams.OrderBy(p => p.Name);
                    break;
                case "capacity":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.Capacity) : queryRams.OrderBy(p => p.Capacity);
                    break;
                case "modules":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.Modules) : queryRams.OrderBy(p => p.Modules);
                    break;
                case "speed":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.Speed) : queryRams.OrderBy(p => p.Speed);
                    break;
                case "type":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.RamType.Name) : queryRams.OrderBy(p => p.RamType.Name);
                    break;
                case "price":
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.Price) : queryRams.OrderBy(p => p.Price);
                    break;
                default:
                    queryRams = queryParams.SortDir == "desc" ? queryRams.OrderByDescending(p => p.ReleaseYear) : queryRams.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryRams.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryRams
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetRamDto
                {
                    Id = c.RamId,
                    Name = c.Name,
                    Capacity = c.Capacity,
                    Modules = c.Modules,
                    Speed = c.Speed,
                    RamType = c.RamType.Name,
                    Price = c.Price,
                    Image = c.Image,
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetRamDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailRamDto>? GetRamDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Rams.Include(p => p.Manufacturer).Include(p => p.RamType).FirstOrDefaultAsync(p => p.RamId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Ram not found"); }

            var reqRam = new DetailRamDto()
            {
                RamId = CurrentItem.RamId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                Capacity = CurrentItem.Capacity,
                Modules = CurrentItem.Modules,
                Speed = CurrentItem.Speed,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
                RamType = CurrentItem.RamType.Name
            };
            return reqRam;
        }

        public async Task<List<BackOfficeRamDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeRamDto>();
            var list = await _context.Rams.Include(p => p.Manufacturer).Include(p => p.RamType).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeRamDto()
            {
                RamId = i.RamId,
                Name = i.Name,
                Price = i.Price,
                Capacity = i.Capacity,
                Modules = i.Modules,
                Speed = i.Speed,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
                RamType = new SingleSupportItemDto()
                {
                    Id = i.RamType.RamTypeId,
                    Name = i.RamType.Name,
                },
            }).ToList();
            return AllItemList;
        }



    }
    }

