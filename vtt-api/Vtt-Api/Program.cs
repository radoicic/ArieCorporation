using Vtt_Api.Domain.DataAccess;
using Microsoft.EntityFrameworkCore;
using MediatR;
using System.Reflection;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.CommandAndQueryHandlers.Queries;
using Vtt_Api.Services;
using Vtt_Api.Services.Interface;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using AutoMapper;
using Vtt_Api.Middleware.Authorization;
using Vtt_Api.Middleware.Logging;
using Microsoft.OpenApi.Models;

const string AllowSpecificOrigins = "_allowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<VttContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddMediatR(typeof(GetVaccineListQuery).Assembly, typeof(GetVaccineListQueryHandler).Assembly);
builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<ICryptoService, CryptoService>();
builder.Services.AddTransient<ILoggerService, LoggerService>();
builder.Services.AddTransient<IClaimsService, ClaimsService>();
builder.Services.AddTransient<IMessagingService, MessagingService>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehaviour<,>));
builder.Services.AddTransient<IMessagingService, MessagingService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidateAudience = false
    };
});

builder.Services.AddSwaggerGen(c =>
{
    // add JWT Authentication
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token **_only_**",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // must be lower case
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins, policyBuilder =>
    {
        policyBuilder
            .WithOrigins(builder.Configuration["CorsUrl"])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(AllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
