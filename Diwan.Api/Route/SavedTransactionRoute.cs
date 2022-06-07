using Diwan.Api.Data;

namespace Diwan.Api.Route
{
    public static class SavedTransactionRoute
    {
        public static async Task<IResult> Save(DiwanContext _context, TransactionDto model)
        {
            if (model == null)
            {
                return Results.Problem("Model is null");
            }
            User user = await _context.Users.FindAsync(model.UserId);
            if (user == null)
            {
                return Results.Problem("User Not Found");
            }
            user.CurrentPage = model.Page;
            _context.Users.Update(user);
            await _context.SavedTransactions.AddAsync(new SavedTransaction
            {
                Page = model.Page,
                UserId = model.UserId,
                CreatedDate = DateTime.Now.ToString(),
                Percentage = model.Percentage,
            });
            await _context.SaveChangesAsync();
            return Results.Ok(model.UserId);
        }
    }
}
