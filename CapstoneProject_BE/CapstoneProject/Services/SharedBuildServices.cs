using System.Reflection.Metadata.Ecma335;
using CapstoneProject.Data;
using CapstoneProject.DTOs.Build;
using CapstoneProject.DTOs.SharedBuild;
using CapstoneProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace CapstoneProject.Services
{
    public class SharedBuildServices
    {
        private readonly ApplicationDbContext _context;
        private readonly ImageService _imageService;
        public SharedBuildServices(ApplicationDbContext context, ImageService imageService) { _context = context; _imageService = imageService; }

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

        public async Task<bool> AddSharedAsync(string userEmail , Guid? buildId, AddNewSharedDto dto)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }

            var build = await _context.UserBuilds.Include(p => p.Build).ThenInclude(p => p.Case).Include(p => p.Build).ThenInclude(p => p.Cpu).FirstOrDefaultAsync(p => p.BuildId == buildId && p.UserId== user.Id);
            if(build == null) { return false; }

            var isCompleted = build.Build.CpuId != null &&
                              build.Build.CpuCoolerId != null &&
                              build.Build.MotherboardId != null &&
                              build.Build.RamId != null &&
                              build.Build.GpuId != null &&
                              build.Build.StorageId != null &&
                              build.Build.PowerSupplyId != null &&
                              build.Build.CaseId != null;
            if (!isCompleted) { throw new KeyNotFoundException("All componets must be present to share the build"); }

            var alreadyShared = await _context.SharedBuilds.AnyAsync(p=> p.UserBuildId == buildId);
            if (alreadyShared) { return true; }

            string webPath = null;
            if (dto.Image != null)
            {
                //SERVIZIO image per aggiunta
                webPath = await _imageService.AddImage(dto.Image, "shared");
            }
            var newSharedBuild = new SharedBuild()
            {
                UserBuildId = build.UserBuildId,
                IsFeatured = false,
                Description = dto.Description,
                Image = dto.Image != null ? webPath : build.Build.Case.Image
            };
            
            build.SharedBuild = newSharedBuild;
            _context.SharedBuilds.Add(newSharedBuild);
            
            return await SaveAsync();
        }

        public async Task<List<SingleShareBuildDto>?> GetAllSharedAsync()
        {
            var SharedList = new List<SingleShareBuildDto>();

            var list = await _context.SharedBuilds
                .Include(p=> p.UserBuild).ThenInclude(p=> p.User)
                .Include(p=> p.UserBuild).ThenInclude(p=> p.Build)                  
                .Include(p=> p.UserBuild).ThenInclude(p=> p.Build).ThenInclude(p=> p.Cpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Gpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Case)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.CpuCooler)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Motherboard)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Ram)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Storage)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.PowerSupply)
                .ToListAsync();

            if (!list.Any()) {return SharedList;}

            SharedList = list.Select(s => new SingleShareBuildDto()
            {
                Id = s.Id,
                UserBuildId = s.UserBuildId,
                Image = s.Image ?? "/assets/images/default.jpg",

                UserName = s.UserBuild.User.UserName,
                BuildName = s.UserBuild.Build.Name,
                CreatedAt = s.UserBuild.Build.CreatedAt,

                CpuName = s.UserBuild.Build.Cpu?.Name ?? "N/D",
                GpuName = s.UserBuild.Build.Gpu?.Name ?? "N/D",
                CaseName = s.UserBuild.Build.Case?.Name ?? "N/D",

                TotalPrice = (s.UserBuild.Build.Cpu?.Price ?? 0) +
                            ( s.UserBuild.Build.CpuCooler?.Price ?? 0) +
                             (s.UserBuild.Build.Motherboard?.Price ?? 0) +
                             (s.UserBuild.Build.Ram?.Price ?? 0) +
                             (s.UserBuild.Build.Gpu?.Price ?? 0) +
                             (s.UserBuild.Build.Storage?.Price ?? 0) +
                             (s.UserBuild.Build.Case?.Price ?? 0) +
                             (s.UserBuild.Build.PowerSupply?.Price ?? 0),
                IsFeatured = s.IsFeatured,

            }).ToList();
            return SharedList;
        }
        public async Task<SharedBuildDetailDto>? GetSharedDetailAsync(Guid userBuildId)
        {
            var SharedBuild = await _context.SharedBuilds
                .Include(p => p.UserBuild).ThenInclude(p => p.User)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Cpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Gpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Case)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.CpuCooler)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Motherboard)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Ram)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Storage)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.PowerSupply)
                .FirstOrDefaultAsync(p => p.UserBuildId == userBuildId);
            if(SharedBuild == null) { return null; }

            var DetailBuild = new SharedBuildDetailDto()
            {
                Id = SharedBuild.Id,
                UserBuildId = SharedBuild.UserBuildId,
                Username = SharedBuild.UserBuild.User.UserName,
                BuildName = SharedBuild.UserBuild.Build.Name,
                Description = SharedBuild.Description,
                LastModified = SharedBuild.UserBuild.LastModified,
                RequiredWattage = SharedBuild.UserBuild.Build.RequiredWattage,
                MaxBuildWattage = SharedBuild.UserBuild.Build.PowerSupply?.Wattage,

                Cpu = SharedBuild.UserBuild.Build.Cpu != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Cpu.CpuId,
                    Name = SharedBuild.UserBuild.Build.Cpu.Name,
                    Price = SharedBuild.UserBuild.Build.Cpu.Price,
                    Image = SharedBuild.UserBuild.Build.Cpu.Image,
                } : null,
                Cpucooler = SharedBuild.UserBuild.Build.CpuCooler != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.CpuCooler.CpuCoolerId,
                    Name = SharedBuild.UserBuild.Build.CpuCooler.Name,
                    Price = SharedBuild.UserBuild.Build.CpuCooler.Price,
                    Image = SharedBuild.UserBuild.Build.CpuCooler.Image,
                } : null,
                Motherboard = SharedBuild.UserBuild.Build.Motherboard != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Motherboard.MotherboardId,
                    Name = SharedBuild.UserBuild.Build.Motherboard.Name,
                    Price = SharedBuild.UserBuild.Build.Motherboard.Price,
                    Image = SharedBuild.UserBuild.Build.Motherboard.Image,
                } : null,
                Gpu = SharedBuild.UserBuild.Build.Gpu != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Gpu.GpuId,
                    Name = SharedBuild.UserBuild.Build.Gpu.Name,
                    Price = SharedBuild.UserBuild.Build.Gpu.Price,
                    Image = SharedBuild.UserBuild.Build.Gpu.Image,
                } : null,
                Ram = SharedBuild.UserBuild.Build.Ram != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Ram.RamId,
                    Name = SharedBuild.UserBuild.Build.Ram.Name,
                    Price = SharedBuild.UserBuild.Build.Ram.Price,
                    Image = SharedBuild.UserBuild.Build.Ram.Image,
                } : null,
                Storage = SharedBuild.UserBuild.Build.Storage != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Storage.StorageId,
                    Name = SharedBuild.UserBuild.Build.Storage.Name,
                    Price = SharedBuild.UserBuild.Build.Storage.Price,
                    Image = SharedBuild.UserBuild.Build.Storage.Image,
                } : null,
                Powersupply = SharedBuild.UserBuild.Build.PowerSupply != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.PowerSupply.PowerSupplyId,
                    Name = SharedBuild.UserBuild.Build.PowerSupply.Name,
                    Price = SharedBuild.UserBuild.Build.PowerSupply.Price,
                    Image = SharedBuild.UserBuild.Build.PowerSupply.Image,
                } : null,
                Case = SharedBuild.UserBuild.Build.Case != null ? new ComponentDetailDto()
                {
                    Id = SharedBuild.UserBuild.Build.Case.CaseId,
                    Name = SharedBuild.UserBuild.Build.Case.Name,
                    Price = SharedBuild.UserBuild.Build.Case.Price,
                    Image = SharedBuild.UserBuild.Build.Case.Image,
                } : null,
            };
            return DetailBuild;
        }

        public async Task<bool> DeleteMySharedBuildAsync(string userEmail, Guid id)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }

            var sharedBuild = await _context.SharedBuilds.Include(p=> p.UserBuild).FirstOrDefaultAsync(p => p.UserBuildId == id && p.UserBuild.UserId == user.Id);
            if (sharedBuild == null) { return false; }

            if (!string.IsNullOrWhiteSpace(sharedBuild.Image))
            {
                if (sharedBuild.Image.Contains("shared"))
                {
                    _imageService.DeleteImage(sharedBuild.Image);
                }
                //SERVIZIO DELETE IMMAGINI
            }

            _context.SharedBuilds.Remove(sharedBuild);

            return await SaveAsync();
        }

        public async Task<bool> DeleteSharedAsAdminAsync( Guid id)
        {
            var sharedBuild = await _context.SharedBuilds.FirstOrDefaultAsync(p => p.UserBuildId == id);
            if (sharedBuild == null) { return false; }

            if (!string.IsNullOrWhiteSpace(sharedBuild.Image))
            {
                if (sharedBuild.Image.Contains("shared"))
                {
                _imageService.DeleteImage(sharedBuild.Image);
                }
                //SERVIZIO DELETE IMMAGINI
            }

            _context.SharedBuilds.Remove(sharedBuild);

            return await SaveAsync();
        }

        public async Task<bool> SetAsFeaturedAsync(Guid id, bool isFeatured)
        {
            var sharedBuild = await _context.SharedBuilds.FirstOrDefaultAsync(p => p.UserBuildId == id);
            if (sharedBuild == null) { return false; }
            if (sharedBuild.IsFeatured && isFeatured) { return true; }

            sharedBuild.IsFeatured = isFeatured;
            return await SaveAsync();
        }


        public async Task<List<SingleFeaturedSharedDto>?> GetFeaturedForHomepageAsync()
        {
            var SharedList = new List<SingleFeaturedSharedDto>();

            var list = await _context.SharedBuilds
                .Include(p => p.UserBuild).ThenInclude(p => p.User)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Cpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Gpu)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Case)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.CpuCooler)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Motherboard)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Ram)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.Storage)
                .Include(p => p.UserBuild).ThenInclude(p => p.Build).ThenInclude(p => p.PowerSupply)
                .Where(p=> p.IsFeatured == true)
                .ToListAsync();

            if (!list.Any()) { return SharedList; }

            SharedList = list.Select(s => new SingleFeaturedSharedDto()
            {
                Id = s.Id,
                UserBuildId = s.UserBuildId,
                Image = s.Image ?? "/assets/images/default.jpg",

                UserName = s.UserBuild.User.UserName,
                BuildName = s.UserBuild.Build.Name,
                CreatedAt = s.UserBuild.Build.CreatedAt,

                CpuName = s.UserBuild.Build.Cpu?.Name ?? "N/D",
                GpuName = s.UserBuild.Build.Gpu?.Name != null ? $"{s.UserBuild.Build.Gpu?.Name} {s.UserBuild.Build.Gpu?.Chipset}" : "N/D",
                CaseName = s.UserBuild.Build.Case?.Name ?? "N/D",

                TotalPrice = (s.UserBuild.Build.Cpu?.Price ?? 0) +
                            (s.UserBuild.Build.CpuCooler?.Price ?? 0) +
                             (s.UserBuild.Build.Motherboard?.Price ?? 0) +
                             (s.UserBuild.Build.Ram?.Price ?? 0) +
                             (s.UserBuild.Build.Gpu?.Price ?? 0) +
                             (s.UserBuild.Build.Storage?.Price ?? 0) +
                             (s.UserBuild.Build.Case?.Price ?? 0) +
                             (s.UserBuild.Build.PowerSupply?.Price ?? 0),
                IsFeatured = s.IsFeatured,
                Description = s.Description,

            }).ToList();
            return SharedList;
        }
    }
}
