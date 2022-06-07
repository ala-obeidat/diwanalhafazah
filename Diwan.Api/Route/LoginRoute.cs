namespace Diwan.Api.Route
{
    public static class LoginRoute
    {
        public static async Task<IResult> SystemLogin(DiwanContext _context, LoginDto model)
        {
            if (model == null)
            {
                return Results.Problem("Model is null");
            }
            var test = _context.Systems.ToList();
            var user = await _context.Systems.FirstOrDefaultAsync(x => x.Username == model.Username && x.Password == model.Password);
            if (user == null)
            {
                return Results.Problem("Invalid Username or password");
            }
            user.LoginDate = DateTime.Now.ToString();
            _context.Systems.Update(user);
            await _context.SaveChangesAsync();
            var response = new LoginResponse()
            {
                CurrentPage = 1,
                Id = -1,
                Name = user.Username,
                Token = ""
            };
            return Results.Ok(response);
        }
        public static async Task<IResult> Login(DiwanContext _context, string mobile)
        {
            if (string.IsNullOrEmpty(mobile))
            {
                return Results.Problem("Mobile is null");
            }
            var user = await _context.Users.Where(x => x.Mobile == mobile).ToListAsync();
            if (!user.Any())
            {
                return Results.Problem("Invalid Username or password");
            }
            if (user.Count == 1)
            {
                var item = user.First();
                item.LoginDate = DateTime.Now.ToString();
                _context.Users.Update(item);
                await _context.SaveChangesAsync();
                var response = new LoginResponse()
                {
                    CurrentPage = item.CurrentPage,
                    Id = item.Id,
                    Name = item.Name,
                    Token = ""
                };
                return Results.Ok(response);
            }
            var responseNames = user.Select(x => x.Name).ToList();
            return Results.Ok(responseNames);
        }
        public static async Task<IResult> LoginName(DiwanContext _context, string mobile, string name)
        {
            if (string.IsNullOrEmpty(mobile))
            {
                return Results.Problem("Mobile is null");
            }
            if (string.IsNullOrEmpty(name))
            {
                return Results.Problem("Name is null");
            }
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Mobile == mobile && x.Name == name);
            if (user is null)
            {
                return Results.Problem("Invalid Username or password");
            }

            user.LoginDate = DateTime.Now.ToString();
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            var response = new LoginResponse()
            {
                CurrentPage = user.CurrentPage,
                Id = user.Id,
                Name = user.Name,
                Token = ""
            };
            return Results.Ok(response);
        }
    }
}