namespace Diwan.Api.Route
{
    public static class UserRoute
    {
        public static async Task<IResult> Create(DiwanContext _context, UserDto model)
        {
            if (model == null)
            {
                return Results.Problem("Model is null");
            }


            if (await _context.Users.AnyAsync(x => x.Name == model.Name && x.Mobile == model.Mobile))
            {
                return Results.Problem("Mobile and Name already exist");
            }
            var user = new User();
            if (model.CurrentPage <= 0)
            {
                model.CurrentPage = 1;
            }

            user.CurrentPage = model.CurrentPage;
            user.Age = model.Age;
            user.Name = model.Name;
            user.Mobile = model.Mobile;
            user.Gender = model.Gender;
            user.Level = model.Level;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Results.Ok(user.Id);
        }
        public static async Task<IResult> Update(DiwanContext _context, long id, UserDto model)
        {
            if (model == null)
            {
                return Results.Problem("Model is null");
            }
            model.Id = id;
            User user = await _context.Users.FindAsync(model.Id);
            if (user == null)
            {
                return Results.Problem("User Not Found");
            }
            if (await _context.Users.AnyAsync(x => x.Name == model.Name && x.Mobile == model.Mobile && x.Id != model.Id))
            {
                return Results.Problem("Mobile and Name already exist");
            }
            user.CurrentPage = model.CurrentPage;
            user.Age = model.Age;
            user.Name = model.Name;
            user.Mobile = model.Mobile;
            user.Gender = model.Gender;
            user.Level = model.Level;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Results.Ok(model.Id);
        }
        public static async Task<IResult> Get(DiwanContext _context, long id)
        {
            if (id <= 0)
            {
                return Results.Problem("Invalid Id");
            }
            User user = null;
            user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return Results.Problem("User Not Found");
            }
            var response = new UserDto()
            {
                Id = id,
                Name = user.Name,
                Mobile = user.Mobile,
                Gender = user.Gender,
                Level = user.Level,
                CurrentPage = user.CurrentPage,
                Age = user.Age
            };

            return Results.Ok(response);
        }
        public static async Task<IResult> Remove(DiwanContext _context, long id)
        {
            try
            {
                if (id <= 0)
                {
                    return Results.Problem("Invalid Id");
                }
                User user = null;
                user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return Results.Problem("User Not Found");
                }
                var transactions = await _context.SavedTransactions
                    .Where(x => x.UserId == user.Id).ToListAsync();
                if (transactions.Any())
                {
                    _context.RemoveRange(transactions);
                }
                _context.Remove(user);
                await _context.SaveChangesAsync();
                return Results.Ok(user.Id);
            }
            catch (Exception ex)
            {
                File.AppendAllText("C:/inetpub/poc/log.txt", "\n\r" + ex.Message);
                return Results.Problem(ex.Message);
            }

        }
        public static async Task<IResult> Detail(DiwanContext _context, long id)
        {
            if (id <= 0)
            {
                return Results.Problem("Invalid Id");
            }
            User user = null;
            user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return Results.Problem("User Not Found");
            }
            var response = new UserResponse()
            {
                User = new UserDto()
                {
                    Id = id,
                    Name = user.Name,
                    Mobile = user.Mobile,
                    Gender = user.Gender,
                    Level = user.Level,
                    CurrentPage = user.CurrentPage,
                    Age = user.Age
                },
                Transactions = await _context.SavedTransactions.Where(x => x.UserId == id)
                .OrderByDescending(x => x.Page)
                .Select(x => new TransactionResponse(x.CreatedDate)
                {
                    Page = x.Page,
                    Percentage = x.Percentage ?? 1,
                }).ToListAsync()
            };
            if (response is not null && response.Transactions.Any())
            {
                foreach (var item in response.Transactions)
                {
                    item.Date = item.dateTime.Split(' ')[0];
                    item.Time = item.dateTime.Split(' ')[1];
                }
            }
            return Results.Ok(response);
        }
        public static async Task<IResult> List(DiwanContext _context)
        {
            var response = await _context.Users.Select(x => new UserDto()
            {
                Age = x.Age,
                CurrentPage = x.CurrentPage,
                Gender = x.Gender,
                Id = x.Id,
                Name = x.Name,
                Level = x.Level,
                Mobile = x.Mobile,

            }).ToListAsync();
            return Results.Ok(response);
        }
    }
}
