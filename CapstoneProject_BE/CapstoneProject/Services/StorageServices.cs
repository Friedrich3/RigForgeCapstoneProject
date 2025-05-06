using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.Storage;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace CapstoneProject.Services
{
    public class StorageServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public StorageServices(ApplicationDbContext context, ImageService imageService)
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

        public async Task<bool> AddNewAsync(AddStorageDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "storage");
            }
            var newStorage = new Storage()
            {
                StorageId = Guid.NewGuid(),
                Name = dto.Name,
                Capacity = dto.Capacity,
                Interface = dto.Interface,
                FormFactor = dto.FormFactor,
                NvmeSupport= dto.NvmeSupport,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                ReleaseYear = dto.ReleaseYear,
                Description = dto.Description,
                Image = webPath,
                StorageTypeId = dto.StorageTypeId,
                ManufacturerId = dto.ManufacturerId,
            };
            _context.Storages.Add(newStorage);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveStorageDto dto)
        {
            var currentStorage = await _context.Storages.FirstOrDefaultAsync(p => p.StorageId == id);
            if (currentStorage == null) { throw new KeyNotFoundException("Storage Device not Found"); }
            //Cattura immagine
            string webPath = currentStorage.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentStorage.Image!, "storage");
            }
            currentStorage.Image = webPath;
            currentStorage.Name = dto.Name;
            currentStorage.Capacity = dto.Capacity;
            currentStorage.Interface = dto.Interface;
            currentStorage.FormFactor = dto.FormFactor;
            currentStorage.NvmeSupport = dto.NvmeSupport;
            currentStorage.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentStorage.ReleaseYear = dto.ReleaseYear;
            currentStorage.Description = dto.Description;
            currentStorage.StorageTypeId = dto.StorageTypeId;
            currentStorage.ManufacturerId = dto.ManufacturerId;

            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentStorage = await _context.Storages.FirstOrDefaultAsync(p => p.StorageId == id);
            if (currentStorage == null) { throw new KeyNotFoundException("Storage Device not found"); }

            if (!string.IsNullOrWhiteSpace(currentStorage.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentStorage.Image);
            }
            _context.Storages.Remove(currentStorage);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetStorageDto>> GetAllStorageAsync(StorageQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryStorage = _context.Storages.Include(p => p.Manufacturer).Include(p => p.StorageType).AsQueryable();

            if (queryParams.Manufacturer.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (queryParams.StorageType.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.StorageTypeId == queryParams.StorageType);
            }
            if (queryParams.MinStorage.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.Capacity >= queryParams.MinStorage);
            }
            if (queryParams.MaxStorage.HasValue)
            {
                queryStorage = queryStorage.Where(p => p.Capacity <= queryParams.MaxStorage);
            }
            if (!string.IsNullOrEmpty(queryParams.Interface))
            {
                queryStorage = queryStorage.Where(p => p.Interface == queryParams.Interface);
            }
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryStorage = queryStorage.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.Name) : queryStorage.OrderBy(p => p.Name);
                    break;
                case "capacity":
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.Capacity) : queryStorage.OrderBy(p => p.Capacity);
                    break;
                case "interface":
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.Interface) : queryStorage.OrderBy(p => p.Interface);
                    break;
                case "formfactor":
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.FormFactor) : queryStorage.OrderBy(p => p.FormFactor);
                    break;
                case "price":
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.Price) : queryStorage.OrderBy(p => p.Price);
                    break;
                default:
                    queryStorage = queryParams.SortDir == "desc" ? queryStorage.OrderByDescending(p => p.ReleaseYear) : queryStorage.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryStorage.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryStorage
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetStorageDto
                {
                    Id = c.StorageId,
                    Name = c.Name,
                    Price = c.Price,
                    Capacity = c.Capacity,
                    Interface = c.Interface,
                    FormFactor = c.FormFactor,
                    Image = c.Image,
                    StorageType = c.StorageType.Name
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetStorageDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailStorageDto>? GetStorageDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Storages.Include(p => p.Manufacturer).Include(p => p.StorageType).FirstOrDefaultAsync(p => p.StorageId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Storage Unit not found"); }

            var reqStorage = new DetailStorageDto()
            {
                StorageId = CurrentItem.StorageId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                Capacity = CurrentItem.Capacity,
                Interface = CurrentItem.Interface,
                FormFactor = CurrentItem.FormFactor,
                NvmeSupport = CurrentItem.NvmeSupport,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
                StorageType = CurrentItem.StorageType.Name
            };
            return reqStorage;
        }

        public async Task<List<BackOfficeStorageDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeStorageDto>();
            var list = await _context.Storages.Include(p => p.Manufacturer).Include(p => p.StorageType).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeStorageDto()
            {
                StorageId = i.StorageId,
                Name = i.Name,
                Price = i.Price,
                Capacity = i.Capacity,
                Interface = i.Interface,
                FormFactor = i.FormFactor,
                NvmeSupport = i.NvmeSupport,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
                StorageType = new SingleSupportItemDto()
                {
                    Id = i.StorageType.StorageTypeId,
                    Name = i.StorageType.Name,
                }
            }).ToList();
            return AllItemList;
        }

    }
}
