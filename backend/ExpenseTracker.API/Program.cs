using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Infrastructure.Data;
using ExpenseTracker.Infrastructure.Repositories;
using ExpenseTracker.Domain.Interfaces;
using ExpenseTracker.Application.Interfaces;
using ExpenseTracker.Application.Services;
using ExpenseTracker.Application.Mappings;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ExpenseTracker.Application.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "SuperSecretKeyForDevelopmentOnly123!";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
}

builder.Services.AddDbContext<ExpenseDbContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions => sqlOptions.EnableRetryOnFailure()));

// Dependency Injection
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Auto-run migrations with retry logic & Seeding
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<ExpenseDbContext>();
        var authService = services.GetRequiredService<IAuthService>();
        
        // Simple retry strategy for database availability
        int retries = 15;
        while (retries > 0)
        {
            try
            {
                logger.LogInformation($"Checking database connectivity... {retries} retries left.");

                // 1. Check connection to 'master' to ensure SQL Server is up
                var connectionStringBuilder = new Microsoft.Data.SqlClient.SqlConnectionStringBuilder(connectionString);
                connectionStringBuilder.InitialCatalog = "master";
                var masterConnectionString = connectionStringBuilder.ConnectionString;

                using (var masterConnection = new Microsoft.Data.SqlClient.SqlConnection(masterConnectionString))
                {
                    await masterConnection.OpenAsync();
                    logger.LogInformation("Successfully connected to SQL Server (master).");
                }

                // 2. Now run migrations (which will create ExpenseTrackerDb if missing)
                logger.LogInformation("Applying migrations...");
                await context.Database.MigrateAsync();
                
                // 3. Seed Users
                if (!await context.Users.AnyAsync())
                {
                    logger.LogInformation("Seeding default users...");
                    var demoUser = new UserRegisterDto 
                    { 
                        Username = "Demo User", 
                        Email = "demo@example.com", 
                        Password = "Password123!" 
                    };
                    await authService.RegisterAsync(demoUser);
                    logger.LogInformation("Seeded demo user: demo@example.com / Password123!");
                }

                break; // Success
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, $"Database unavailable. Retrying in 3 seconds... ({retries} attempts left)");
                retries--;
                System.Threading.Thread.Sleep(3000);
            }
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred migrating the DB.");
    }
}

app.UseCors("AllowAll");

app.UseAuthentication(); // Add Authentication Middleware
app.UseAuthorization();

app.MapControllers();

app.Run();