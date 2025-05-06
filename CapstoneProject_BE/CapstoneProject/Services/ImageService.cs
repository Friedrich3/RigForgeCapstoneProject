using CapstoneProject.DTOs.Cpu;

namespace CapstoneProject.Services
{
    public class ImageService
    {

        public async Task<string> AddImage(IFormFile DtoImage, string folder)
        {
            
            var fileName = DtoImage.FileName;
            var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images", folder, fileName);
            await using (var stream = new FileStream(path, FileMode.Create))
            {
                await DtoImage.CopyToAsync(stream);
            }
            var returnPath = Path.Combine("assets", "images", folder, fileName);
            return returnPath;
        }



        public async Task<string> EditImage(IFormFile DtoImage, string currentImage, string folder)
                                        //  Dto.Image           Current.Image       "cartellaDiRiferimento"
        {
            if (!string.IsNullOrEmpty(currentImage))
            {
                var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), currentImage.TrimStart('/'));
                if (File.Exists(oldImagePath))
                {
                    File.Delete(oldImagePath);
                }
            }
            var fileName = DtoImage.FileName;
            var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images", folder, fileName);

            await using (var stream = new FileStream(path, FileMode.Create))
            {
                await DtoImage.CopyToAsync(stream);
            }
            var returnPath = $"assets/images/{folder}/" + fileName;
            return returnPath;
        }

        public void DeleteImage(string currentImage)
        {
            var relativePath = currentImage.Replace("/", Path.DirectorySeparatorChar.ToString())
                                                    .Replace("\\", Path.DirectorySeparatorChar.ToString());
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);
            if (File.Exists(imagePath))
            {
                File.Delete(imagePath);
            }
        }

    }
}
