namespace Diwan.Api.Route
{
    public static class DashboardRoute
    {
        public static async Task<IResult> Get(DiwanContext _context)
        {
            var userCount = await _context.Users.CountAsync();
            var response = new DashboardResponse()
            {
                UserCount = userCount,
            };
            return Results.Ok(response);
        }
    }
}
