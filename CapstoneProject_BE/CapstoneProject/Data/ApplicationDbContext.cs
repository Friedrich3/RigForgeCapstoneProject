using System;
using CapstoneProject.Models;
using CapstoneProject.Models.Auth;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CapstoneProject.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        //TABELLE AUTH
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
		public DbSet<ApplicationRole> ApplicationRoles { get; set; }
		public DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }

        public DbSet<Build> Builds { get; set; }
        public DbSet<UserBuild> UserBuilds { get; set; }
        
        public DbSet<SharedBuild> SharedBuilds { get; set; }

        //TABELLE COMPONENTS
        public DbSet<Cpu> Cpus { get; set; }
        public DbSet<CpuCooler> CpuCoolers { get; set; }
        public DbSet<Motherboard> Motherboards { get; set; }
        public DbSet<Gpu> Gpus { get; set; }
        public DbSet<Ram> Rams { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<PowerSupply> PowerSupplies { get; set; }
        public DbSet<Case> Cases { get; set; }




        //Tabelle Relazionali
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Socket> Sockets { get; set; }
        public DbSet<RamType> RamTypes { get; set; }
        public DbSet<FormFactor> FormFactors { get; set; }
        public DbSet<CpuCoolerSocket> CpuCoolerSockets { get; set; }
        public DbSet<StorageType> StorageTypes { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur=> ur.User).WithMany(u=> u.ApplicationUserRole).HasForeignKey(ur => ur.UserId);
            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.Role).WithMany(r => r.ApplicationUserRole).HasForeignKey(ur =>ur.RoleId);
            modelBuilder.Entity<ApplicationUserRole>().Property(ur => ur.Date).HasDefaultValueSql("GETDATE()").IsRequired(true);
            modelBuilder.Entity<ApplicationUser>().HasIndex(p => p.UserName).IsUnique();

            //creazione ruoli
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole() { Id = "8D4568F8-6945-4F04-8F6A-91641968BE13", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = "8D4568F8-6945-4F04-8F6A-91641968BE13" });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole() { Id = "4992905D-7E33-49CE-9A27-D973E01E96E1", Name = "Moderator", NormalizedName = "MODERATOR", ConcurrencyStamp = "4992905D-7E33-49CE-9A27-D973E01E96E1" });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole() { Id = "51736DED-179A-415D-80EF-7129869E932E", Name = "User", NormalizedName = "USER", ConcurrencyStamp = "51736DED-179A-415D-80EF-7129869E932E" });

            //TabellaRelazionata User -> Build
            modelBuilder.Entity<UserBuild>().HasOne(ub => ub.User).WithMany(u => u.UserBuilds).HasForeignKey(u => u.UserId);
            modelBuilder.Entity<UserBuild>().HasOne(ub => ub.Build).WithMany(u => u.UserBuilds).HasForeignKey(b => b.BuildId);

            //TabellaRelazionata Socket -> Cooler
            modelBuilder.Entity<CpuCoolerSocket>().HasOne(cs => cs.CpuCooler).WithMany(c=> c.CpuCoolerSockets).HasForeignKey(cs=> cs.CpuCoolerId);
            modelBuilder.Entity<CpuCoolerSocket>().HasOne(cs => cs.Socket).WithMany(s=> s.CpuCoolerSockets).HasForeignKey(cs=> cs.SocketId);

            //SEEDING INIZIALE PER TABELLE DI SUPPORTO
            modelBuilder.Entity<Manufacturer>().HasData(
                new Manufacturer { ManufacturerId = 1, Name = "Intel", Categories = "cpu,motherboard" },
                new Manufacturer { ManufacturerId = 2, Name = "AMD", Categories = "cpu,gpu" },
                new Manufacturer { ManufacturerId = 3, Name = "NVIDIA", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 4, Name = "Corsair", Categories = "ram,cooler,powersupply,case" },
                new Manufacturer { ManufacturerId = 5, Name = "MSI", Categories = "gpu,motherboard,powersupply" },
                new Manufacturer { ManufacturerId = 6, Name = "ASUS", Categories = "gpu,motherboard,cooler" },
                new Manufacturer { ManufacturerId = 7, Name = "Gigabyte", Categories = "gpu,motherboard,powersupply" },
                new Manufacturer { ManufacturerId = 8, Name = "Cooler Master", Categories = "cooler,case,powersupply" },
                new Manufacturer { ManufacturerId = 9, Name = "Western Digital", Categories = "storage" },
                new Manufacturer { ManufacturerId = 10, Name = "Seagate", Categories = "storage" },
                new Manufacturer { ManufacturerId = 11, Name = "Noctua", Categories = "cooler" },
                new Manufacturer { ManufacturerId = 12, Name = "G.Skill", Categories = "ram" },
                new Manufacturer { ManufacturerId = 13, Name = "Kingston", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 14, Name = "ADATA", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 15, Name = "Crucial", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 16, Name = "EVGA", Categories = "gpu,powersupply" },
                new Manufacturer { ManufacturerId = 17, Name = "Thermaltake", Categories = "case,cooler,powersupply" },
                new Manufacturer { ManufacturerId = 18, Name = "NZXT", Categories = "case,cooler" },
                new Manufacturer { ManufacturerId = 19, Name = "Fractal Design", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 20, Name = "Be Quiet!", Categories = "cooler,powersupply,case" },
                new Manufacturer { ManufacturerId = 21, Name = "TeamGroup", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 22, Name = "Samsung", Categories = "storage,ram" },
                new Manufacturer { ManufacturerId = 23, Name = "Patriot", Categories = "ram" },
                new Manufacturer { ManufacturerId = 24, Name = "Inland", Categories = "storage" },
                new Manufacturer { ManufacturerId = 25, Name = "ASRock", Categories = "motherboard" },
                new Manufacturer { ManufacturerId = 26, Name = "Biostar", Categories = "motherboard" },
                new Manufacturer { ManufacturerId = 27, Name = "Lian Li", Categories = "case" },
                new Manufacturer { ManufacturerId = 28, Name = "Phanteks", Categories = "case,cooler" },
                new Manufacturer { ManufacturerId = 29, Name = "XPG", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 30, Name = "SilverStone", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 31, Name = "Zotac", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 32, Name = "Palit", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 33, Name = "PNY", Categories = "gpu,storage" },
                new Manufacturer { ManufacturerId = 34, Name = "Colorful", Categories = "gpu,motherboard" },
                new Manufacturer { ManufacturerId = 35, Name = "XFX", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 36, Name = "PowerColor", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 37, Name = "Sapphire", Categories = "gpu" },
                new Manufacturer { ManufacturerId = 38, Name = "Apacer", Categories = "ram,storage" },
                new Manufacturer { ManufacturerId = 39, Name = "Lexar", Categories = "storage,ram" },
                new Manufacturer { ManufacturerId = 40, Name = "Toshiba", Categories = "storage" },
                new Manufacturer { ManufacturerId = 41, Name = "Verbatim", Categories = "storage" },
                new Manufacturer { ManufacturerId = 42, Name = "Enermax", Categories = "cooler,powersupply" },
                new Manufacturer { ManufacturerId = 43, Name = "DeepCool", Categories = "cooler,case" },
                new Manufacturer { ManufacturerId = 44, Name = "Rosewill", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 45, Name = "Aerocool", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 46, Name = "Sharkoon", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 47, Name = "Chieftec", Categories = "powersupply" },
                new Manufacturer { ManufacturerId = 48, Name = "BitFenix", Categories = "case" },
                new Manufacturer { ManufacturerId = 49, Name = "SilverStone Technology", Categories = "case,powersupply" },
                new Manufacturer { ManufacturerId = 50, Name = "Thermalright", Categories = "cooler" }
            );

            modelBuilder.Entity<Socket>().HasData(
                new Socket { SocketId = 1, Name = "LGA1151" },
                new Socket { SocketId = 2, Name = "LGA1200" },
                new Socket { SocketId = 3, Name = "LGA1700" },
                new Socket { SocketId = 4, Name = "LGA2066" },
                new Socket { SocketId = 5, Name = "LGA2011-v3" },
                new Socket { SocketId = 6, Name = "AM3+" },
                new Socket { SocketId = 7, Name = "AM4" },
                new Socket { SocketId = 8, Name = "AM5" },
                new Socket { SocketId = 9, Name = "sTRX4" },          
                new Socket { SocketId = 10, Name = "sWRX8" },         
                new Socket { SocketId = 11, Name = "SP3" },           
                new Socket { SocketId = 12, Name = "FM2+" },          
                new Socket { SocketId = 13, Name = "TR4" },           
                new Socket { SocketId = 14, Name = "Socket 939" }
            );

            modelBuilder.Entity<RamType>().HasData(
                 new RamType { RamTypeId = 1, Name = "DDR" },
                 new RamType { RamTypeId = 2, Name = "DDR2" },
                 new RamType { RamTypeId = 3, Name = "DDR3" },
                 new RamType { RamTypeId = 4, Name = "DDR4" },
                 new RamType { RamTypeId = 5, Name = "DDR5" }
            );

            modelBuilder.Entity<StorageType>().HasData(
                new StorageType { StorageTypeId = 1, Name = "HDD" },
                new StorageType { StorageTypeId = 2, Name = "SSD" },
                new StorageType { StorageTypeId = 3, Name = "M.2" },
                new StorageType { StorageTypeId = 4, Name = "U.2" },
                new StorageType { StorageTypeId = 5, Name = "External HDD" },
                new StorageType { StorageTypeId = 6, Name = "External SSD" },
                new StorageType { StorageTypeId = 7, Name = "Hybrid (SSHD)" }
            );

            modelBuilder.Entity<FormFactor>().HasData(
                new FormFactor { FormFactorId = 1, Name = "E-ATX" },
                new FormFactor { FormFactorId = 2, Name = "ATX" },
                new FormFactor { FormFactorId = 3, Name = "Micro-ATX" },
                new FormFactor { FormFactorId = 4, Name = "Mini-ITX" }
            );

            modelBuilder.Entity<Cpu>()
            .Property(c => c.BaseClock)
            .HasColumnType("decimal(5,2)");

            modelBuilder.Entity<Cpu>()
                .Property(c => c.BoostClock)
                .HasColumnType("decimal(5,2)");

            modelBuilder.Entity<UserBuild>().HasOne(p => p.SharedBuild).WithOne(p => p.UserBuild);

            //modelBuilder.Entity<UserBuild>().HasOne(ub => ub.User).WithMany(u => u.UserBuilds).HasForeignKey(u => u.UserId);











        }
    }
}
