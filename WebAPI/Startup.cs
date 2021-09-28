using Aplicacion.Contratos;
using Aplicacion.Cursos;
using Dominio;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistencia;
using Persistencia.DapperConexion;
using Persistencia.DapperConexion.Instructor;
using Persistencia.DapperConexion.Paginacion;
using Seguridad;
using Seguridad.TokenSeguridad;
using System.Text;
using WebAPI.Middleware;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //Para CORS
            services.AddCors(o => o.AddPolicy("corsApp", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            //para bd
            services.AddDbContext<CursosOnlineContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddOptions();
            //para usar dapper
            services.Configure<ConexionConfiguracion>(Configuration.GetSection("ConnectionStrings"));


            services.AddMediatR(typeof(Consulta.Manejador).Assembly);

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Nuevo>());


            var builder = services.AddIdentityCore<Usuario>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);

            //Para instanciar el servicio de role manager
            //Para instanciar el objeto para roles
            identityBuilder.AddRoles<IdentityRole>();
            //PAra agregar a los tokens de seguridad el rol
            identityBuilder.AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<Usuario, IdentityRole>>();

            //Guarda la data de los users que ingresen a la app
            identityBuilder.AddEntityFrameworkStores<CursosOnlineContext>();

            //Quien maneja el login 
            identityBuilder.AddSignInManager<SignInManager<Usuario>>();

            services.TryAddSingleton<ISystemClock, SystemClock>();

            //Agregamos la seguridad
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
           {
               var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Mi palabra secreta!"));

               opt.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true, //Cualqueira tiene q ser validado por la logica
                   IssuerSigningKey = key,  //Palabra clave para jwt
                   ValidateAudience = false,     //Quien puede crear tokens (cualquier ip)
                   ValidateIssuer = false       //A quien enviarle el token (cualquier ip)
               };
           });


            //WEBAPI podra acceder a los tokens gracias a esta services injection 
            services.AddScoped<IJwtGenerador, JwtGenerador>();


            //
            services.AddScoped<IUsuarioSesion, UsuarioSesion>();

            //Para que se ejecute el mapeo en el proyecto
            services.AddAutoMapper(typeof(Consulta.Manejador));

            services.AddTransient<IFactoryConnection, FactoryConnection>();
            services.AddScoped<IInstructor, InstructorRepositorio>();

            // Para instanciar como dependency injection el objeto paginacion
            services.AddScoped<IPaginacion, PaginacionRepositorio>();

            ///Soportar Swager
            services.AddSwaggerGen(c =>
           {
               c.SwaggerDoc("v1", new OpenApiInfo
               {
                   Title = "Servicios para mantenimiento de cursos",
                   Version = "v1"
               });
               c.CustomSchemaIds(c => c.FullName);
           });

        }




        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            //Para cors que configure arriba
            app.UseCors("corsApp");

            app.UseMiddleware<ManejadorErrorMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            //Que se use la autentication
            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Para soportar interfaz de swager
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cursos Online v1");

            });
        }
    }
}
