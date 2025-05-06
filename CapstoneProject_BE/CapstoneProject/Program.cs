using System.Text;
using CapstoneProject.Data;
using CapstoneProject.Models.Auth;
using CapstoneProject.Services;
using CapstoneProject.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("System", Serilog.Events.LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Async(a => a.File("Log/log_txt", rollingInterval: RollingInterval.Day))
    .WriteTo.Async(a => a.Console())
    .CreateLogger();
try
{
    Log.Information("Starting application...");
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount = builder.Configuration.GetSection("Identity").GetValue<bool>("SignInRequireConfirmedAccount");
        options.Password.RequiredLength = builder.Configuration.GetSection("Identity").GetValue<int>("RequiredLength");
        options.Password.RequireDigit = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireDigit");
        options.Password.RequireLowercase = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireLowercase");
        options.Password.RequireUppercase = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireUppercase");
        options.Password.RequireNonAlphanumeric = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireNonAlphanumeric");
    }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

    builder.Services.Configure<Jwt>(builder.Configuration.GetSection(nameof(Jwt)));

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Issuer"),
            ValidAudience = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("SecurityKey")))
        };
    });

    builder.Services.AddScoped<UserManager<ApplicationUser>>();
    builder.Services.AddScoped<SignInManager<ApplicationUser>>();
    builder.Services.AddScoped<RoleManager<ApplicationRole>>();

    //AllServices
    builder.Services.AddScoped<BuildServices>();
    builder.Services.AddScoped<CaseServices>();
    builder.Services.AddScoped<CpuCoolerServices>();
    builder.Services.AddScoped<CpuServices>();
    builder.Services.AddScoped<GpuServices>();
    builder.Services.AddScoped<MotherboardServices>();
    builder.Services.AddScoped<PowerSupplyServices>();
    builder.Services.AddScoped<RamServices>();
    builder.Services.AddScoped<StorageServices>();
    builder.Services.AddScoped<ImageService>();
    builder.Services.AddScoped<SupportServices>();
    builder.Services.AddScoped<SharedBuildServices>();

    builder.Services.AddScoped<GoogleAuthServices>();


    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();
    //Settings per le immaginistatiche
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "assets", "images")),
        RequestPath = "/assets/images"
    });
    //SEEDING
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        DbSeeder.SeedCpus(db);
        DbSeeder.SeedCoolers(db);
        DbSeeder.SeedMotherboard(db);
        DbSeeder.SeedGpus(db);
        DbSeeder.SeedRams(db);
        DbSeeder.SeedStorage(db);
        DbSeeder.SeedCases(db);
        DbSeeder.SeedPowerSupplies(db);
    }


    //CORS
    app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Error(ex.Message);
}
finally
{
    await Log.CloseAndFlushAsync();
}