using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.Components;

namespace CapstoneProject.Models.SupportTables
{
    public class Socket
    {
        [Key]
        public int SocketId { get; set; }

        [Required]
        public required string Name { get; set; }


        public ICollection<Cpu>? Cpus { get; set; }
        public ICollection<Motherboard>? Motherboards { get; set; }

        public ICollection<CpuCoolerSocket>? CpuCoolerSockets { get; set; }
    }
}
