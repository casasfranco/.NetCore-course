using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class UsuarioRolAgregar
    {
        public class Ejecuta : IRequest
        {
            public string Username { get; set; }
            public string RolNombre { get; set; }
        }

        public class EjecutaValidador : AbstractValidator<Ejecuta>
        {
            public EjecutaValidador()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.RolNombre).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly RoleManager<IdentityRole> _rolManager;

            public Manejador(UserManager<Usuario> userManager, RoleManager<IdentityRole> rolManager)
            {
                _userManager = userManager;
                _rolManager = rolManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var role = await _rolManager.FindByNameAsync(request.RolNombre);
                if (role == null)
                {
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new { mensaje = "El rol no existe" });
                }

                var usuarioIden = await _userManager.FindByNameAsync(request.Username);

                if (usuarioIden == null)
                {
                    throw new ManejadorExcepcion(HttpStatusCode.NotFound, new { mensaje = "El usuario no existe" });
                }

                //si ambos existen entonces hago la transaccion
                var result = await _userManager.AddToRoleAsync(usuarioIden, request.RolNombre);
                if (result.Succeeded)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo agregar el Rol al usuario");
            }
        }
    }
}
