using Google.Apis.Auth;

namespace CapstoneProject.Services
{
    public class GoogleAuthServices
    {
        public async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleTokenAsync(string idToken)
        {
			var settings = new GoogleJsonWebSignature.ValidationSettings()
			{
				Audience = new List<string> { "845457542161-ourm7lpu1pho4dfrb76mh1t34mbpko59.apps.googleusercontent.com" }
			};

			try
			{
				var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
				return payload;
			}
			catch 
			{
				return null;
			}
        }
    }
}
