using System.ComponentModel.DataAnnotations;
using CapstoneProject.Models.Components;

namespace CapstoneProject.Models.SupportTables
{
    public class CpuCoolerSocket
    {
        [Key]
        public int Id { get; set; }

        public Guid CpuCoolerId { get; set; }
        public CpuCooler CpuCooler { get; set; }

        public int SocketId { get; set; }
        public Socket Socket { get; set; }

    }
}
