namespace Diwan.Api
{
    public static class Configure
    {
        private static void MapPattrens(this WebApplication app)
        {
            #region GET

            app.MapGet("/", () => "Diwan API");

            app.MapGet("/user", UserRoute.List);
            app.MapGet("/user/details/{id}", UserRoute.Detail);
            app.MapGet("/user/{id}", UserRoute.Get);

            app.MapGet("/dash", DashboardRoute.Get);

            #endregion

            #region PUT
            app.MapPut("/user/{id}", UserRoute.Update);
            #endregion

            #region POST

            app.MapPost("/user", UserRoute.Create);
            app.MapPost("/transaction", SavedTransactionRoute.Save);
            app.MapPost("/systemlogin", LoginRoute.SystemLogin);
            app.MapPost("/login/{mobile}", LoginRoute.Login);
            app.MapPost("/loginname/{mobile}/{name}", LoginRoute.LoginName);

            #endregion

            #region MyRegion
            app.MapDelete("/user/{id}", UserRoute.Remove);
            #endregion

        }

        #region Other
        public static void ConfigureApi(this WebApplicationBuilder builder)
        {

            var app = builder.Build();
            app.UseCors();
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseHttpsRedirection();
            app.MapPattrens();
            app.Run();
        }
        #endregion
    }
}
