using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Intex2025.API.Data;
using Intex2025.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Intex2025 API",
        Version = "v1"
    });
});

// SQL Server - this is fine as-is
builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieConnection")));

// SQLite (Recommendations)
builder.Services.AddDbContext<RecommendationsContext>(options =>
{
    var provider = new ServiceCollection()
        .AddEntityFrameworkSqlite()
        .BuildServiceProvider();

    options.UseSqlite(builder.Configuration.GetConnectionString("RecsConnection"))
        .UseInternalServiceProvider(provider);
});

// SQLite (Identity/Auth)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var provider = new ServiceCollection()
        .AddEntityFrameworkSqlite()
        .BuildServiceProvider();

    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection"))
        .UseInternalServiceProvider(provider);
});

builder.Services.AddAuthorization();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;

    // ✅ Custom password settings
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 12;
    options.Password.RequireNonAlphanumeric = false; // no @!# required
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;

    // ✅ Allow any email-like string
    options.User.RequireUniqueEmail = true;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

    // Return 401/403 instead of redirecting
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});

// ✅ Define and use "AllowFrontend" CORS policy globally
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://calm-tree-0ae01fe1e.6.azurestaticapps.net")
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// Enable Swagger in all environments (including Production)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Intex2025 API V1");
    c.RoutePrefix = "swagger"; // This makes it available at /swagger
});


app.UseCors("AllowFrontend"); // ✅ Use named policy explicitly
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", (HttpContext context, ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
        return Results.Unauthorized();

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";

    // 🧠 Grab all roles assigned to the user
    var roles = user.Claims
        .Where(c => c.Type == ClaimTypes.Role)
        .Select(c => c.Value)
        .ToList();

    return Results.Json(new
    {
        email = email,
        roles = roles
    });
}).RequireAuthorization();


app.MapGet("/unauthorized", () => Results.Unauthorized());
app.MapGet("/test", () => "API is alive3!");

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();

}

app.Run();



