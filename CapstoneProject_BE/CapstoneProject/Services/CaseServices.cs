using System.Globalization;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Case;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class CaseServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public CaseServices(ApplicationDbContext context, ImageService imageService)
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

        public async Task<bool> AddNewAsync(AddCaseDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "case");
            }
            var newCase = new Case()
            {
                CaseId = Guid.NewGuid(),
                Name = dto.Name,
                Color = dto.Color,
                FanSupportCount = dto.FanSupportCount,
                HasGlassPanel = dto.HasGlassPanel,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                ReleaseYear = dto.ReleaseYear,
                Description = dto.Description,
                Image = webPath,
                ManufacturerId = dto.ManufacturerId,
                FormFactorId = dto.FormFactorId,
            };
            _context.Cases.Add(newCase);

            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveCaseDto dto)
        {
            var currentCase = await _context.Cases.FirstOrDefaultAsync(p => p.CaseId == id);
            if (currentCase == null) { throw new KeyNotFoundException("Case not Found"); }
            //Cattura immagine
            string webPath = currentCase.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentCase.Image!, "case");
            }
            currentCase.Image = webPath;
            currentCase.Name = dto.Name;
            currentCase.Color = dto.Color;
            currentCase.FanSupportCount = dto.FanSupportCount;
            currentCase.HasGlassPanel = dto.HasGlassPanel;
            currentCase.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentCase.ReleaseYear = dto.ReleaseYear;
            currentCase.Description = dto.Description;
            currentCase.ManufacturerId = dto.ManufacturerId;
            currentCase.FormFactorId = dto.FormFactorId;
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentCase = await _context.Cases.FirstOrDefaultAsync(p => p.CaseId == id);
            if (currentCase == null) { throw new KeyNotFoundException("Case not found"); }

            if (!string.IsNullOrWhiteSpace(currentCase.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentCase.Image);
            }
            _context.Cases.Remove(currentCase);
            return await SaveAsync(); 
        }

        public async Task<PagedResultDto<SingleGetCaseDto>> GetAllCaseAsync(CaseQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryCases = _context.Cases.Include(p => p.Manufacturer).Include(p => p.FormFactor).AsQueryable();

            if (queryParams.CkFormFactor.HasValue)
            {
                var mobo = await _context.Motherboards.AsNoTracking().FirstOrDefaultAsync(m => m.MotherboardId == queryParams.CkFormFactor.Value);
                if (mobo != null)
                {    //filtra in base all'id sono messi a db dal piu grande al piu piccolo
                    queryCases = queryCases.Where(p => p.FormFactorId <= mobo.FormFactorId);
                }
            }

            if (queryParams.Manufacturer.HasValue)
            {
                queryCases = queryCases.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.FormFactor.HasValue)
            {
                queryCases = queryCases.Where(p => p.FormFactorId == queryParams.FormFactor);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryCases = queryCases.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryCases = queryCases.Where(p => p.Price <= queryParams.maxPrice);
            }
            //
            if (queryParams.GlassPanel.HasValue)
            {
                queryCases = queryCases.Where(p => p.HasGlassPanel == queryParams.GlassPanel);
            }
            if (!string.IsNullOrEmpty(queryParams.Color))
            {
                queryCases = queryCases.Where(p => p.Color.Contains(queryParams.Color));
            }
            //
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryCases = queryCases.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryCases = queryParams.SortDir == "desc" ? queryCases.OrderByDescending(p => p.Name) : queryCases.OrderBy(p => p.Name);
                    break;
                case "formfactor":
                    queryCases = queryParams.SortDir == "desc" ? queryCases.OrderByDescending(p => p.FormFactor.Name) : queryCases.OrderBy(p => p.FormFactor.Name);
                    break;
                case "color":
                    queryCases = queryParams.SortDir == "desc" ? queryCases.OrderByDescending(p => p.Color) : queryCases.OrderBy(p => p.Color);
                    break;
                case "price":
                    queryCases = queryParams.SortDir == "desc" ? queryCases.OrderByDescending(p => p.Price) : queryCases.OrderBy(p => p.Price);
                    break;
                default:
                    queryCases = queryParams.SortDir == "desc" ? queryCases.OrderByDescending(p => p.ReleaseYear) : queryCases.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryCases.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryCases
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetCaseDto
                {
                    Id = c.CaseId,
                    Name = c.Name,
                    Price = c.Price,
                    FormFactor = c.FormFactor.Name,
                    HasGlassPanel = c.HasGlassPanel,
                    Color = c.Color,
                    FanSupportCount = c.FanSupportCount,
                    Image = c.Image,
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetCaseDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailCaseDto>? GetCaseDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Cases.Include(p => p.Manufacturer).Include(p => p.FormFactor).FirstOrDefaultAsync(p => p.CaseId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Case not found"); }

            var reqCase = new DetailCaseDto()
            {
                CaseId = CurrentItem.CaseId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                Color = CurrentItem.Color,
                FanSupportCount = CurrentItem.FanSupportCount,
                HasGlassPanel = CurrentItem.HasGlassPanel,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
                FormFactor = CurrentItem.FormFactor.Name
            };
            return reqCase;
        }

        public async Task<List<BackOfficeCaseDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeCaseDto>();
            var list = await _context.Cases.Include(p => p.Manufacturer).Include(p => p.FormFactor).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeCaseDto()
            {
                CaseId = i.CaseId,
                Name = i.Name,
                Price = i.Price,
                Color = i.Color,
                FanSupportCount = i.FanSupportCount,
                HasGlassPanel = i.HasGlassPanel,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name,
                },
                FormFactor = new SingleSupportItemDto()
                {
                    Id = i.FormFactor.FormFactorId,
                    Name = i.FormFactor.Name
                }
            }).ToList();
            return AllItemList;
        }

    }
}
