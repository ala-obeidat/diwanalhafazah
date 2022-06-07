namespace Diwan.Api.Model
{
    public class LoginResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long CurrentPage { get; set; }
        public string Token { get; set; }
    }
}
