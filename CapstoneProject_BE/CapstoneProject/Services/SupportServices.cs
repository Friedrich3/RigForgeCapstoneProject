using CapstoneProject.Data;
using CapstoneProject.DTOs.SupportTables;
using Microsoft.EntityFrameworkCore;

namespace CapstoneProject.Services
{
    public class SupportServices
    {
        private readonly ApplicationDbContext _context;
        public SupportServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<SingleSupportItemDto>> GetAllManufacturersAsync(string? category)
        {
            var query = _context.Manufacturers.AsQueryable();
            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(p => p.Categories.Contains(category));
            }
            return await query
                .OrderBy(m => m.ManufacturerId)
                .Select(m => new SingleSupportItemDto
                {
                    Id = m.ManufacturerId,
                    Name = m.Name
                })
                .ToListAsync();
        }
        public async Task<List<SingleSupportItemDto>> GetAllSocketAsync()
        {
            return await _context.Sockets
                .OrderBy(m => m.Name)
                .Select(m => new SingleSupportItemDto
                {
                    Id = m.SocketId,
                    Name = m.Name
                })
                .ToListAsync();
        }
        public async Task<List<SingleSupportItemDto>> GetAllFormFactorAsync()
        {
            return await _context.FormFactors
                .OrderBy(m => m.Name)
                .Select(m => new SingleSupportItemDto
                {
                    Id = m.FormFactorId,
                    Name = m.Name
                }).OrderBy(p =>p.Id)
                .ToListAsync();
        }
        public async Task<List<SingleSupportItemDto>> GetAllRamTypeAsync()
        {
            return await _context.RamTypes
                .OrderBy(m => m.Name)
                .Select(m => new SingleSupportItemDto
                {
                    Id = m.RamTypeId,
                    Name = m.Name
                })
                .ToListAsync();
        }
        public async Task<List<SingleSupportItemDto>> GetAllStorageTypeAsync()
        {
            return await _context.StorageTypes
                .OrderBy(m => m.Name)
                .Select(m => new SingleSupportItemDto
                {
                    Id = m.StorageTypeId,
                    Name = m.Name
                })
                .ToListAsync();
        }
    }
}
