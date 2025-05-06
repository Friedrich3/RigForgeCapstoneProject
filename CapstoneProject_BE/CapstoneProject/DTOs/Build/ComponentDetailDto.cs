namespace CapstoneProject.DTOs.Build
{
    public class ComponentDetailDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }
    }
}
