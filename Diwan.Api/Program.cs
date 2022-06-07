using Diwan.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DiwanDb");
builder.Services.AddSqlite<DiwanContext>(connectionString);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
        {
            builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.ConfigureApi();
