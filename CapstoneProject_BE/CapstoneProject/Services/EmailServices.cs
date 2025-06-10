using FluentEmail.Core;

namespace CapstoneProject.Services
{
    public class EmailServices
    {
        private readonly IFluentEmail _fluentEmail;
        public EmailServices( IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }


        public async Task<bool> SendConfirmEmail(string email)
        {
            var result = await _fluentEmail.To(email).Subject("Conferma Email").Body("Clicca su questo link per confermare il tuo account").SendAsync();
            return result.Successful;
        }












    }
}