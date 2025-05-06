namespace CapstoneProject.DTOs.CpuCooler
{
    public class CpuCoolerDtoForSeed
    {
            public Guid CpuCoolerId { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
            public int Tdp { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
            public string Image { get; set; }
            public int ManufacturerId { get; set; }
            public List<int> CpuCoolerSockets { get; set; }
        
    }
}
