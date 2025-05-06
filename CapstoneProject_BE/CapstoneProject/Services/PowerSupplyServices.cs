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
    public class PowerSupplyServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public PowerSupplyServices(ApplicationDbContext context, ImageService imageService)
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

        public async Task<bool> AddNewAsync(AddPsuDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "psu");
            }
            var newPsu = new PowerSupply()
            {
                PowerSupplyId = Guid.NewGuid(),
                Name = dto.Name,
                Wattage = dto.Wattage,
                EfficiencyRating = dto.EfficiencyRating,
                Modular = dto.Modular,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                ReleaseYear = dto.ReleaseYear,
                Description = dto.Description,
                Image = webPath,
                ManufacturerId = dto.ManufacturerId,
            };
            _context.PowerSupplies.Add(newPsu);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSavePsuDto dto)
        {
            var currentPsu = await _context.PowerSupplies.FirstOrDefaultAsync(p => p.PowerSupplyId == id);
            if (currentPsu == null) { throw new KeyNotFoundException("Power Supply Unit not Found"); }
            //Cattura immagine
            string webPath = currentPsu.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentPsu.Image!, "psu");
            }
            currentPsu.Image = webPath;
            currentPsu.Name = dto.Name;
            currentPsu.Wattage = dto.Wattage;
            currentPsu.EfficiencyRating = dto.EfficiencyRating;
            currentPsu.Modular = dto.Modular;
            currentPsu.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentPsu.ReleaseYear = dto.ReleaseYear;
            currentPsu.Description = dto.Description;
            currentPsu.ManufacturerId = dto.ManufacturerId;
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentPsu = await _context.PowerSupplies.FirstOrDefaultAsync(p => p.PowerSupplyId == id);
            if (currentPsu == null) { throw new KeyNotFoundException("Power Supply Unit not found"); }

            if (!string.IsNullOrWhiteSpace(currentPsu.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentPsu.Image);
            }
            _context.PowerSupplies.Remove(currentPsu);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetPsuDto>> GetAllPsuAsync(PsuQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryPsus = _context.PowerSupplies.Include(p => p.Manufacturer).AsQueryable();

            if (queryParams.CkWattage.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Wattage >= queryParams.CkWattage.Value);
            }

            if (queryParams.Manufacturer.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.MinWattage.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Wattage >= queryParams.MinWattage);
            }
            if (queryParams.MaxWattage.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Wattage <= queryParams.MaxWattage);
            }
            if (queryParams.Modular.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Modular == queryParams.Modular);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryPsus = queryPsus.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryPsus = queryPsus.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.Name) : queryPsus.OrderBy(p => p.Name);
                    break;
                case "wattage":
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.Wattage) : queryPsus.OrderBy(p => p.Wattage);
                    break;
                case "modular":
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.Modular) : queryPsus.OrderBy(p => p.Modular);
                    break;
                case "efficiency":
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.EfficiencyRating) : queryPsus.OrderBy(p => p.EfficiencyRating);
                    break;
                case "price":
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.Price) : queryPsus.OrderBy(p => p.Price);
                    break;
                default:
                    queryPsus = queryParams.SortDir == "desc" ? queryPsus.OrderByDescending(p => p.ReleaseYear) : queryPsus.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryPsus.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryPsus
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetPsuDto
                {
                    Id = c.PowerSupplyId,
                    Name = c.Name,
                    Price = c.Price,
                    Wattage = c.Wattage,
                    EfficiencyRating = c.EfficiencyRating,
                    Modular = c.Modular,
                    Image = c.Image,
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetPsuDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailPsuDto>? GetPsuDetailAsync(Guid id)
        {
            var CurrentItem = await _context.PowerSupplies.Include(p => p.Manufacturer).FirstOrDefaultAsync(p => p.PowerSupplyId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required PowerSupply Unit not found"); }

            var reqPsu = new DetailPsuDto()
            {
                PowerSupplyId = CurrentItem.PowerSupplyId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                Wattage = CurrentItem.Wattage,
                EfficiencyRating = CurrentItem.EfficiencyRating,
                Modular = CurrentItem.Modular,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
            };
            return reqPsu;
        }

        public async Task<List<BackOfficePsuDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficePsuDto>();
            var list = await _context.PowerSupplies.Include(p => p.Manufacturer).ToListAsync();

            AllItemList = list.Select(i => new BackOfficePsuDto()
            {
                PowerSupplyId = i.PowerSupplyId,
                Name = i.Name,
                Price = i.Price,
                Wattage = i.Wattage,
                EfficiencyRating = i.EfficiencyRating,
                Modular = i.Modular,
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
