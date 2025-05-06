using System.Text.Json;
using CapstoneProject.DTOs.CpuCooler;
using CapstoneProject.Models.Components;
using CapstoneProject.Models.SupportTables;

namespace CapstoneProject.Data
{
    public static class DbSeeder
    {
        public static void SeedCpus(ApplicationDbContext context)
        {
            if (context.Cpus.Any()) return; // già popolato

            var json = File.ReadAllText("SeedData/seed_cpus.json");
            var cpus = JsonSerializer.Deserialize<List<Cpu>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (cpus != null)
            {
                context.Cpus.AddRange(cpus);
                context.SaveChanges();
            }
        }

        public static void SeedCoolers(ApplicationDbContext context)
        {
            if (context.CpuCoolers.Any()) return; // Già popolato

            var path = Path.Combine("SeedData", "seed_cpucoolers.json");
            if (!File.Exists(path)) return;

            var json = File.ReadAllText(path);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var coolerDtos = JsonSerializer.Deserialize<List<CpuCoolerDtoForSeed>>(json, options); // Usa un Dto per leggere i socket

            if (coolerDtos != null && coolerDtos.Count > 0)
            {
                var coolers = new List<CpuCooler>();
                var coolerSockets = new List<CpuCoolerSocket>();
                foreach (var dto in coolerDtos)
                {
                    var cooler = new CpuCooler
                    {
                        CpuCoolerId = dto.CpuCoolerId,
                        Name = dto.Name,
                        Type = Enum.Parse<CoolerType>(dto.Type),
                        Tdp = dto.Tdp,
                        Price = dto.Price,
                        Description = dto.Description,
                        Image = dto.Image,
                        ManufacturerId = dto.ManufacturerId,
                        CpuCoolerSockets = new List<CpuCoolerSocket>()
                    };
                    coolers.Add(cooler);
                    foreach (var socketId in dto.CpuCoolerSockets)
                    {
                        coolerSockets.Add(new CpuCoolerSocket
                        {
                            CpuCoolerId = cooler.CpuCoolerId,
                            SocketId = socketId
                        });
                    }
                }
                context.CpuCoolers.AddRange(coolers);
                context.CpuCoolerSockets.AddRange(coolerSockets);
                context.SaveChanges();
            }
        }

        public static void SeedMotherboard(ApplicationDbContext context)
        {
            if (context.Motherboards.Any()) return; // già popolato

            var json = File.ReadAllText("SeedData/seed_motherboards.json");
            var mobos = JsonSerializer.Deserialize<List<Motherboard>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (mobos != null && mobos.Count > 0)
            {
                context.Motherboards.AddRange(mobos);
                context.SaveChanges();
            }
        }

        public static void SeedGpus(ApplicationDbContext context) 
        {
            if(context.Gpus.Any()) return;
            var json = File.ReadAllText("SeedData/seed_gpus.json");
            var gpus = JsonSerializer.Deserialize<List<Gpu>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if(gpus != null && gpus.Count > 0)
            {
                context.Gpus.AddRange(gpus);
                context.SaveChanges();
            }
        }
        
        public static void SeedRams(ApplicationDbContext context)
        {
            if(context.Rams.Any()) return;
            var json = File.ReadAllText("SeedData/seed_rams.json");
            var rams = JsonSerializer.Deserialize<List<Ram>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (rams != null && rams.Count > 0)
            {
                context.Rams.AddRange(rams);
                context.SaveChanges();
            }
        }

        public static void SeedStorage(ApplicationDbContext context)
        {
            if(context.Storages.Any()) return;
            var json = File.ReadAllText("SeedData/seed_storages.json");
            var storages = JsonSerializer.Deserialize<List<Storage>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if( storages != null  && storages.Count > 0)
            {
                context.Storages.AddRange(storages);
                context.SaveChanges();
            }
        }

        public static void SeedCases(ApplicationDbContext context)
        {
            if (context.Cases.Any()) return;
            var json = File.ReadAllText("SeedData/seed_cases.json");
            var cases = JsonSerializer.Deserialize<List<Case>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (cases != null && cases.Count > 0)
            {
                context.Cases.AddRange(cases);
                context.SaveChanges();
            }
        }
        public static void SeedPowerSupplies(ApplicationDbContext context)
        {
            if (context.PowerSupplies.Any()) return;
            var json = File.ReadAllText("SeedData/seed_powersupplies.json");
            var psus = JsonSerializer.Deserialize<List<PowerSupply>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            if (psus != null && psus.Count > 0)
            {
                context.PowerSupplies.AddRange(psus);
                context.SaveChanges();
            }
        }

    }
}