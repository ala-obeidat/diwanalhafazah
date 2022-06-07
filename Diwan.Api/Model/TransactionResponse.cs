namespace Diwan.Api.Model
{
    public class TransactionResponse
    {
        public TransactionResponse()
        {

        }
        public TransactionResponse(string date)
        {
            dateTime = date;
        }
        public string dateTime { get; init; }
        public long Page { get; set; }
        public long Percentage { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}