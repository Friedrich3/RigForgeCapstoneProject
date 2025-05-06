using System.Globalization;
using System.Net.Sockets;
using CapstoneProject.Data;
using CapstoneProject.DTOs;
using CapstoneProject.DTOs.Cpu;
using CapstoneProject.DTOs.Motherboard;
using CapstoneProject.DTOs.SupportTables;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class MotherboardServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public MotherboardServices(ApplicationDbContext context, ImageService imageService)
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

        public async Task<bool> AddNewAsync(AddMoboDto dto)
        {
            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "mobo");
            }
            var newMobo = new Motherboard()
            {
                MotherboardId = Guid.NewGuid(),
                Name = dto.Name,
                MaxRam = dto.MaxRam,
                RamSlots = dto.RamSlots,
                Chipset = dto.Chipset,
                WifiIncluded = dto.WifiIncluded,
                PcieSlots = dto.PcieSlots,
                M2Slots = dto.M2Slots,
                ReleaseYear = dto.ReleaseYear,
                Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2),
                Description = dto.Description != null ? dto.Description : "",
                Image = webPath,
                //Fks
                RamTypeId = dto.RamTypeId,
                ManufacturerId = dto.ManufacturerId,
                SocketId = dto.SocketId,
                FormFactorId = dto.FormFactorId
            };
            _context.Motherboards.Add(newMobo);
            return await SaveAsync();
        }

        public async Task<bool> EditSaveAsync(Guid id, EditSaveMoboDto dto)
        {
            var currentMobo = await _context.Motherboards.FirstOrDefaultAsync(p => p.MotherboardId == id);
            if (currentMobo == null) { throw new KeyNotFoundException("Motherboard not Found"); }
            //Cattura immagine
            string webPath = currentMobo.Image!;
            if (dto.Image != null)
            {
                //SERVIZIO EDIT IMMAGINI
                webPath = await _imageService.EditImage(dto.Image, currentMobo.Image!, "mobo");
            }
            currentMobo.Image = webPath;
            currentMobo.Name = dto.Name;
            currentMobo.MaxRam = dto.MaxRam;
            currentMobo.RamSlots = dto.RamSlots;
            currentMobo.Chipset = dto.Chipset;
            currentMobo.WifiIncluded = dto.WifiIncluded;
            currentMobo.PcieSlots = dto.PcieSlots;
            currentMobo.M2Slots = dto.M2Slots;
            currentMobo.ReleaseYear = dto.ReleaseYear;
            currentMobo.Price = Math.Round(decimal.Parse(dto.Price, CultureInfo.InvariantCulture), 2);
            currentMobo.Description = dto.Description;
            //Fks
            currentMobo.RamTypeId = dto.RamTypeId;
            currentMobo.ManufacturerId = dto.ManufacturerId;
            currentMobo.SocketId = dto.SocketId;
            currentMobo.FormFactorId = dto.FormFactorId;
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var currentMobo = await _context.Motherboards.FirstOrDefaultAsync(p => p.MotherboardId == id);
            if (currentMobo == null) { throw new KeyNotFoundException("Motherboard not found"); }

            if (!string.IsNullOrWhiteSpace(currentMobo.Image))
            {
                //SERVIZIO DELETE IMMAGINI
                _imageService.DeleteImage(currentMobo.Image);
            }
            _context.Motherboards.Remove(currentMobo);
            return await SaveAsync();
        }

        public async Task<PagedResultDto<SingleGetMoboDto>> GetAllMoboAsync(MoboQueryParamsDto queryParams)

        {
            //rimane in attesa di essere queryzzata
            var queryMobo = _context.Motherboards.Include(p => p.Manufacturer).Include(p => p.Socket).Include(p => p.RamType).Include(p => p.FormFactor).AsQueryable();
            //filtri pre-compatibilita
            if (queryParams.CkSocket.HasValue)
            {
                var cpu = await _context.Cpus.AsNoTracking().FirstOrDefaultAsync(m => m.CpuId == queryParams.CkSocket.Value);
                if (cpu != null)
                {
                    queryMobo = queryMobo.Where(p => p.SocketId == cpu.SocketId);
                }
            }
            if (queryParams.CkRamType.HasValue)
            {
                var ramtype = await _context.Rams.AsNoTracking().FirstOrDefaultAsync(m => m.RamId == queryParams.CkRamType.Value);
                if (ramtype != null)
                {
                    queryMobo = queryMobo.Where(p => p.RamTypeId == ramtype.RamTypeId);
                }
            }
            if (queryParams.CkFormFactor.HasValue)
            {
                var caseForm = await _context.Cases.AsNoTracking().FirstOrDefaultAsync(m => m.CaseId == queryParams.CkFormFactor.Value);
                if (caseForm != null)
                {
                    queryMobo = queryMobo.Where(p => p.FormFactorId >= caseForm.FormFactorId);
                }
            }

            if (queryParams.Manufacturer.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.ManufacturerId == queryParams.Manufacturer);
            }
            if (queryParams.Socket.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.SocketId == queryParams.Socket);
            }
            if (queryParams.RamType.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.RamTypeId == queryParams.RamType);
            }
            if (queryParams.FormFactor.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.FormFactorId == queryParams.FormFactor);
            }
            if (queryParams.minPrice.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.Price >= queryParams.minPrice);
            }
            if (queryParams.maxPrice.HasValue)
            {
                queryMobo = queryMobo.Where(p => p.Price <= queryParams.maxPrice);
            }
            if (!string.IsNullOrEmpty(queryParams.Search))
            //Se string.IsnullorEmpty NON e'
            {
                var searchString = queryParams.Search.ToLower().Trim();
                queryMobo = queryMobo.Where(p => p.Name.ToLower().Contains(searchString));
            }
            switch (queryParams.SortBy.ToLower())
            {
                case "name":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.Name) : queryMobo.OrderBy(p => p.Name);
                    break;
                case "socket":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.Socket.Name) : queryMobo.OrderBy(p => p.Socket.Name);
                    break;
                case "ramtype":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.RamType.Name) : queryMobo.OrderBy(p => p.RamType.Name);
                    break;
                case "manufacturer":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.Manufacturer.Name) : queryMobo.OrderBy(p => p.Manufacturer.Name);
                    break;
                case "formfactor":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.FormFactor.Name) : queryMobo.OrderBy(p => p.FormFactor.Name);
                    break;
                case "price":
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.Price) : queryMobo.OrderBy(p => p.Price);
                    break;
                default:
                    queryMobo = queryParams.SortDir == "desc" ? queryMobo.OrderByDescending(p => p.ReleaseYear) : queryMobo.OrderBy(p => p.ReleaseYear);
                    break;
            }

            var totalcount = await queryMobo.CountAsync();
            //creare la lista che andra' inserita dentro Items
            var List = await queryMobo
                //Skip salta il numero totale di elementi della pagina prima
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                //Take prende il numero di elementi pari a quanti ne vuoi dal pageSize
                .Take(queryParams.PageSize)
                .Select(c => new SingleGetMoboDto
                {
                    Id = c.MotherboardId,
                    Name = c.Name,
                    Socket = c.Socket.Name,
                    MaxRam = c.MaxRam,
                    RamSlots = c.RamSlots,
                    RamType = c.RamType.Name,
                    FormFactor = c.FormFactor.Name,
                    Price = c.Price,
                    Image = c.Image,
                })
                .ToListAsync();

            var pagedList = new PagedResultDto<SingleGetMoboDto>
            {
                Items = List,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                TotalCount = totalcount,
            };
            return pagedList;
        }

        public async Task<DetailMoboDto>? GetMoboDetailAsync(Guid id)
        {
            var CurrentItem = await _context.Motherboards.Include(p => p.Manufacturer).Include(p => p.Socket).Include(p => p.RamType).Include(p => p.FormFactor).FirstOrDefaultAsync(p => p.MotherboardId == id);
            if (CurrentItem == null) { throw new KeyNotFoundException("Required Motherboard not found"); }

            var reqMobo = new DetailMoboDto()
            {
                MotherboardId = CurrentItem.MotherboardId,
                Name = CurrentItem.Name,
                Price = CurrentItem.Price,
                MaxRam = CurrentItem.MaxRam,
                RamSlots = CurrentItem.RamSlots,
                Chipset = CurrentItem.Chipset,
                WifiIncluded = CurrentItem.WifiIncluded,
                PcieSlots = CurrentItem.PcieSlots,
                M2Slots = CurrentItem.M2Slots,
                ReleaseYear = CurrentItem.ReleaseYear,
                Description = CurrentItem.Description,
                Image = CurrentItem.Image,
                Manufacturer = CurrentItem.Manufacturer.Name,
                Socket = CurrentItem.Socket.Name,
                RamType = CurrentItem.RamType.Name,
                FormFactor = CurrentItem.FormFactor.Name,
            };
            return reqMobo;
        }

        public async Task<List<BackOfficeMoboDto>> BackOfficeGetAllAsync()
        {
            var AllItemList = new List<BackOfficeMoboDto>();
            var list = await _context.Motherboards.Include(p => p.Manufacturer).Include(p => p.Socket).Include(p => p.RamType).Include(p => p.FormFactor).ToListAsync();

            AllItemList = list.Select(i => new BackOfficeMoboDto()
            {
                MotherboardId = i.MotherboardId,
                Name = i.Name,
                Price = i.Price,
                MaxRam = i.MaxRam,
                RamSlots = i.RamSlots,
                Chipset = i.Chipset,
                WifiIncluded = i.WifiIncluded,
                PcieSlots = i.PcieSlots,
                M2Slots = i.M2Slots,
                ReleaseYear = i.ReleaseYear,
                Description = i.Description,
                Image = i.Image,
                Manufacturer = new SingleSupportItemDto()
                {
                    Id = i.Manufacturer.ManufacturerId,
                    Name = i.Manufacturer.Name
                },
                Socket = new SingleSupportItemDto()
                {
                    Id = i.Socket.SocketId,
                    Name = i.Socket.Name
                },
                RamType = new SingleSupportItemDto()
                {
                    Id = i.RamType.RamTypeId,
                    Name = i.RamType.Name
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
