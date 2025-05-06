namespace CapstoneProject.DTOs.Cpu
{
    public class SingleGetCpuDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Cores { get; set; }
        public required decimal BaseClock { get; set; }
        public required decimal BoostClock { get; set; }
        public required int Tdp { get; set; }

        public string? Image { get; set; }
        public required decimal Price { get; set; }
        //Fks
        public required string Socket {  get; set; } //Nome Socket
    }
}
