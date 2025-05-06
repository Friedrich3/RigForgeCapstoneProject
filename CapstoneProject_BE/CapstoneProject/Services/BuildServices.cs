using System;
using CapstoneProject.Data;
using CapstoneProject.DTOs.Build;
using CapstoneProject.Models;
using CapstoneProject.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace CapstoneProject.Services
{
    public class BuildServices
    {
        private readonly ApplicationDbContext _context;
        public BuildServices(ApplicationDbContext context)
        {
            _context = context;
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
        private async Task<int> CalculateRequiredWattageAsync(Build build)
        {
            var total = 0;

            if (build.CpuId.HasValue)
                total += (await _context.Cpus.FindAsync(build.CpuId.Value))?.Tdp ?? 0;

            if (build.GpuId.HasValue)
                total += (await _context.Gpus.FindAsync(build.GpuId.Value))?.Tdp ?? 0;

            if (build.CpuCoolerId.HasValue)
                total += (await _context.CpuCoolers.FindAsync(build.CpuCoolerId.Value))?.Tdp ?? 0;

            // Applichiamo un margine di sicurezza (es. 10%)
            return (int)(total * 1.1);
        }

        public async Task<bool> NewBuildAsync(string userEmail)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }

            var allBuilds = await _context.UserBuilds.Where(p=> p.UserId == user.Id && p.IsCurrent == true).ToListAsync();
            if (allBuilds.Count > 0) { 
            foreach (var build in allBuilds) 
            {
                build.IsCurrent = false;            
            }}

            var newGuid = Guid.NewGuid();
            var newBuild = new Build()
            {
                BuildId = newGuid,
                UserBuilds = new List<UserBuild>()
                {
                    new UserBuild()
                    {
                        UserBuildId = newGuid,
                        UserId = user.Id,
                        BuildId = newGuid,
                        IsCurrent = true,
                    }
                }
            };
            _context.Builds.Add(newBuild);
            return await SaveAsync();
        }

        public async Task<BuildDetailDto>? GetActiveBuildAsync(string userEmail)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return null; }
            var currentBuild = await _context.UserBuilds.FirstOrDefaultAsync(p => p.UserId == user.Id && p.IsCurrent == true);
            if (currentBuild == null) {
                var response = await NewBuildAsync(userEmail);
                if (!response)
                {
                    return null;
                }
            }
            var build = await _context.Builds
                .Include(b => b.Cpu)
                .Include(b => b.CpuCooler)
                .Include(b => b.Motherboard)
                .Include(b => b.Gpu)
                .Include(b => b.Ram)
                .Include(b => b.Storage)
                .Include(b => b.PowerSupply)
                .Include(b => b.Case).FirstOrDefaultAsync(p => p.BuildId == currentBuild.BuildId);
            if (build == null) { return null; }

            var buildDetail = new BuildDetailDto()
            {
                BuildId = build.BuildId,
                Name = build.Name,
                CreatedAt = build.CreatedAt,
                Cpu = build.Cpu != null ? new ComponentDetailDto()
                {
                    Id = build.Cpu.CpuId,
                    Name = build.Cpu.Name,
                    Price = build.Cpu.Price,
                    Image = build.Cpu.Image,
                } : null,
                Cpucooler = build.CpuCooler != null ? new ComponentDetailDto()
                {
                    Id = build.CpuCooler.CpuCoolerId,
                    Name = build.CpuCooler.Name,
                    Price = build.CpuCooler.Price,
                    Image = build.CpuCooler.Image,
                } : null,
                Motherboard = build.Motherboard != null ? new ComponentDetailDto()
                {
                    Id = build.Motherboard.MotherboardId,
                    Name = build.Motherboard.Name,
                    Price = build.Motherboard.Price,
                    Image = build.Motherboard.Image,
                } : null,
                Gpu = build.Gpu != null ? new ComponentDetailDto()
                {
                    
                    Id = build.Gpu.GpuId,
                    Name = manageGpuName(build.Gpu.Name, build.Gpu.Chipset),
                    Price = build.Gpu.Price,
                    Image = build.Gpu.Image,
                } : null,
                Ram = build.Ram != null ? new ComponentDetailDto()
                {
                    Id = build.Ram.RamId,
                    Name = build.Ram.Name,
                    Price = build.Ram.Price,
                    Image = build.Ram.Image,
                } : null,
                Storage = build.Storage != null ? new ComponentDetailDto()
                {
                    Id = build.Storage.StorageId,
                    Name = build.Storage.Name,
                    Price = build.Storage.Price,
                    Image = build.Storage.Image,
                } : null,
                Powersupply = build.PowerSupply != null ? new ComponentDetailDto()
                {
                    Id = build.PowerSupply.PowerSupplyId,
                    Name = build.PowerSupply.Name,
                    Price = build.PowerSupply.Price,
                    Image = build.PowerSupply.Image,
                } : null,
                Case = build.Case != null ? new ComponentDetailDto()
                {
                    Id = build.Case.CaseId,
                    Name = build.Case.Name,
                    Price = build.Case.Price,
                    Image = build.Case.Image,
                } : null,
                RequiredWattage = build.RequiredWattage,
                MaxBuildWattage = build.PowerSupply != null ? build.PowerSupply.Wattage : null,
            };
            return buildDetail;
        }
        private string manageGpuName(string gpuName, string gpuChipset)
        {
            if (string.IsNullOrWhiteSpace(gpuName) || string.IsNullOrWhiteSpace(gpuChipset))
            {
                return gpuName;
            }
            var nameParts = gpuName.Split(" ", 2);
            return nameParts.Length == 2 ? $"{nameParts[0]} {gpuChipset} {nameParts[1]}" : $"{gpuName} {gpuChipset}" ;
        }

        public async Task<bool> EditSingleComponentAsync(string userEmail, UpdateBuildComponentDto dto)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.UserBuilds.Include(p=> p.Build).FirstOrDefaultAsync(p => p.UserId == user.Id && p.IsCurrent == true);
            if (currentBuild == null) { return false; }
            switch (dto.ComponentType.Trim().ToLowerInvariant())
            {
                case "cpu":
                    currentBuild.Build.CpuId = dto.ComponentId;
                    break;
                case "cpucooler":
                    currentBuild.Build.CpuCoolerId = dto.ComponentId;
                    break;
                case "motherboard":
                    currentBuild.Build.MotherboardId = dto.ComponentId;
                    break;
                case "ram":
                    currentBuild.Build.RamId = dto.ComponentId;
                    break;
                case "gpu":
                    currentBuild.Build.GpuId = dto.ComponentId;
                    break;
                case "storage":
                    currentBuild.Build.StorageId = dto.ComponentId;
                    break;
                case "powersupply":
                    currentBuild.Build.PowerSupplyId = dto.ComponentId;
                    break;
                case "case":
                    currentBuild.Build.CaseId = dto.ComponentId;
                    break;
                default:
                    return false;
            }
            currentBuild.LastModified = DateTime.UtcNow;
            currentBuild.Build.RequiredWattage = await CalculateRequiredWattageAsync(currentBuild.Build);
            return await SaveAsync();
        }

        public async Task<bool> RemoveSingleComponentAsync(string userEmail, string comp)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.UserBuilds.Include(p => p.Build).FirstOrDefaultAsync(p => p.UserId == user.Id && p.IsCurrent == true);
            if (currentBuild == null) { return false; }
            switch (comp.Trim().ToLowerInvariant())
            {
                case "cpu":
                    currentBuild.Build.CpuId = null;
                    break;
                case "cpucooler":
                    currentBuild.Build.CpuCoolerId = null;
                    break;
                case "motherboard":
                    currentBuild.Build.MotherboardId = null;
                    break;
                case "ram":
                    currentBuild.Build.RamId = null;
                    break;
                case "gpu":
                    currentBuild.Build.GpuId = null;
                    break;
                case "storage":
                    currentBuild.Build.StorageId = null;
                    break;
                case "powersupply":
                    currentBuild.Build.PowerSupplyId = null;
                    break;
                case "case":
                    currentBuild.Build.CaseId = null;
                    break;
                default:
                    return false;
            }
            currentBuild.LastModified = DateTime.UtcNow;
            currentBuild.Build.RequiredWattage = await CalculateRequiredWattageAsync(currentBuild.Build);
            return await SaveAsync();
        }

        public async Task<bool> ResetBuildAsync(string userEmail)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.UserBuilds.Include(p => p.Build).FirstOrDefaultAsync(p => p.UserId == user.Id && p.IsCurrent == true);
            if (currentBuild == null) { return false; }

            bool hasChanges =
            currentBuild.Build.CpuId != null ||
            currentBuild.Build.CpuCoolerId != null ||
            currentBuild.Build.MotherboardId != null ||
            currentBuild.Build.RamId != null ||
            currentBuild.Build.GpuId != null ||
            currentBuild.Build.StorageId != null ||
            currentBuild.Build.PowerSupplyId != null ||
            currentBuild.Build.CaseId != null ||
            currentBuild.Build.RequiredWattage != 0;

            if (!hasChanges) { return true; }

            currentBuild.Build.CpuId = null;
                currentBuild.Build.CpuCoolerId = null;
                currentBuild.Build.MotherboardId = null;
                currentBuild.Build.RamId = null;
                currentBuild.Build.GpuId = null;
                currentBuild.Build.StorageId = null;
                currentBuild.Build.PowerSupplyId = null;
                currentBuild.Build.CaseId = null;
                currentBuild.Build.RequiredWattage = 0;

                return await SaveAsync();
        }
        
        public async Task<List<SingleUserBuildDto>>? GetAllBuildAsync (string userEmail)
        {
            var ListUserBuild = new List<SingleUserBuildDto>();
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return null; }

            var ListAllBuilds = await _context.UserBuilds.Where(p => p.UserId == user.Id)
                .Include(p => p.Build).ThenInclude(b => b.Cpu)
                .Include(p => p.Build).ThenInclude(b => b.CpuCooler)
                .Include(p => p.Build).ThenInclude(b => b.Motherboard)
                .Include(p => p.Build).ThenInclude(b => b.Gpu)
                .Include(p => p.Build).ThenInclude(b => b.Ram)
                .Include(p => p.Build).ThenInclude(b => b.Storage)
                .Include(p => p.Build).ThenInclude(b => b.PowerSupply)
                .Include(p => p.Build).ThenInclude(b => b.Case)
                .Include(p=>p.SharedBuild)
                .ToListAsync();

            ListUserBuild = ListAllBuilds.Select(b => new SingleUserBuildDto()
            {
                BuildId = b.BuildId,
                Name = b.Build.Name,
                CreatedAt = b.Build.CreatedAt,
                LastModified = b.LastModified,
                IsActive = b.IsCurrent,

                IsShared = b.SharedBuild != null ? true : false,

                Cpu = b.Build.Cpu != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Cpu.CpuId,
                    Name = b.Build.Cpu.Name,
                    Price = b.Build.Cpu.Price,
                    Image = b.Build.Cpu.Image,
                } : null,
                Cpucooler = b.Build.CpuCooler != null ? new ComponentDetailDto()
                {
                    Id = b.Build.CpuCooler.CpuCoolerId,
                    Name = b.Build.CpuCooler.Name,
                    Price = b.Build.CpuCooler.Price,
                    Image = b.Build.CpuCooler.Image,
                } : null,
                Motherboard = b.Build.Motherboard != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Motherboard.MotherboardId,
                    Name = b.Build.Motherboard.Name,
                    Price = b.Build.Motherboard.Price,
                    Image = b.Build.Motherboard.Image,
                } : null,
                Gpu = b.Build.Gpu != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Gpu.GpuId,
                    Name = b.Build.Gpu.Name,
                    Price = b.Build.Gpu.Price,
                    Image = b.Build.Gpu.Image,
                } : null,
                Ram = b.Build.Ram != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Ram.RamId,
                    Name = b.Build.Ram.Name,
                    Price = b.Build.Ram.Price,
                    Image = b.Build.Ram.Image,
                } : null,
                Storage = b.Build.Storage != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Storage.StorageId,
                    Name = b.Build.Storage.Name,
                    Price = b.Build.Storage.Price,
                    Image = b.Build.Storage.Image,
                } : null,
                Powersupply = b.Build.PowerSupply != null ? new ComponentDetailDto()
                {
                    Id = b.Build.PowerSupply.PowerSupplyId,
                    Name = b.Build.PowerSupply.Name,
                    Price = b.Build.PowerSupply.Price,
                    Image = b.Build.PowerSupply.Image,
                } : null,
                Case = b.Build.Case != null ? new ComponentDetailDto()
                {
                    Id = b.Build.Case.CaseId,
                    Name = b.Build.Case.Name,
                    Price = b.Build.Case.Price,
                    Image = b.Build.Case.Image,
                } : null,
            }).ToList();
            return ListUserBuild;
        }
        
        public async Task<bool> RemoveBuildAsync(string userEmail, string id)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.Builds.FirstOrDefaultAsync(p=> p.BuildId == Guid.Parse(id));
            if (currentBuild == null) { return false;}

            _context.Builds.Remove(currentBuild);

            return await SaveAsync();
        }

        public async Task<bool> RenameBuildAsync(string userEmail, string id, string name)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.Builds.FirstOrDefaultAsync(p => p.BuildId == Guid.Parse(id));
            if (currentBuild == null) { return false; }

            currentBuild.Name = name;

            return await SaveAsync();
        }
        public async Task<bool> SetBuildToActiveAsync(string userEmail, string id)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            var currentBuild = await _context.UserBuilds.FirstOrDefaultAsync(p => p.BuildId == Guid.Parse(id)&& p.UserId == user.Id );
            if (currentBuild == null) { return false; }

            var allBuilds = await _context.UserBuilds.Where(p => p.UserId == user.Id && p.IsCurrent == true).ToListAsync();
            if (allBuilds.Count > 0)
            {
                foreach (var build in allBuilds)
                {
                    build.IsCurrent = false;
                }
            }
            currentBuild.IsCurrent = true;

            return await SaveAsync();
        }

        public async Task<bool> CloneBuildAsync(string userEmail, Guid buildId)
        {
            //cerca user
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null) { return false; }
            //cerca build da clonare
            var toCloneBuild = await _context.UserBuilds
                .Include(p => p.Build).ThenInclude(b => b.Cpu)
                .Include(p => p.Build).ThenInclude(b => b.CpuCooler)
                .Include(p => p.Build).ThenInclude(b => b.Motherboard)
                .Include(p => p.Build).ThenInclude(b => b.Gpu)
                .Include(p => p.Build).ThenInclude(b => b.Ram)
                .Include(p => p.Build).ThenInclude(b => b.Storage)
                .Include(p => p.Build).ThenInclude(b => b.PowerSupply)
                .Include(p => p.Build).ThenInclude(b => b.Case)
                .FirstOrDefaultAsync(p=> p.UserBuildId == buildId);
            if (toCloneBuild == null) { return false;}

            //metti tutte le altri build se ci sono , a is current false
            var allBuilds = await _context.UserBuilds.Where(p => p.UserId == user.Id && p.IsCurrent == true).ToListAsync();
            if (allBuilds.Count > 0)
            {
                foreach (var build in allBuilds)
                {
                    build.IsCurrent = false;
                }
            }
            //nuovo Id generico per la creazione
            var newGuid = Guid.NewGuid();

            var newClonedBuild = new UserBuild()
            {
                UserBuildId = newGuid,
                UserId = user.Id,
                IsCurrent = true,
                BuildId = newGuid,
                Build = new Build()
                {
                    BuildId = newGuid,
                    Name = toCloneBuild.Build.Name + "(Copy)",
                    UpdatedAt = DateTime.UtcNow,
                    CpuId = toCloneBuild.Build.CpuId,
                    GpuId = toCloneBuild.Build.GpuId,
                    RamId = toCloneBuild.Build.RamId,
                    StorageId = toCloneBuild.Build.StorageId,
                    PowerSupplyId = toCloneBuild.Build.PowerSupplyId,
                    CaseId = toCloneBuild.Build.CaseId,
                    MotherboardId = toCloneBuild.Build.MotherboardId,
                    CpuCoolerId = toCloneBuild.Build.CpuCoolerId,
                    RequiredWattage = toCloneBuild.Build.RequiredWattage,
                }
            };
            _context.UserBuilds.Add(newClonedBuild);

            return await SaveAsync();
        }


    }
}
