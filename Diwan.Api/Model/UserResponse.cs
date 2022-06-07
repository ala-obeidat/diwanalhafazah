namespace Diwan.Api.Model
{
    public class UserResponse
    {
        public UserDto User { get; set; }
        public List<TransactionResponse> Transactions { get; set; }
    }
}