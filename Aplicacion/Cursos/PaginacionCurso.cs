﻿using MediatR;
using Persistencia.DapperConexion.Paginacion;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class PaginacionCurso
    {
        public class Ejecuta : IRequest<PaginacionModel>
        {
            //Filtros
            public string Titulo { get; set; }
            public int numeroPagina { get; set; }
            public int CantidadElementos { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta, PaginacionModel>
        {
            private readonly IPaginacion _paginacion;
            public Manejador(IPaginacion paginacion)
            {
                _paginacion = paginacion;
            }
            public async Task<PaginacionModel> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var storeProcedure = "usp_obtener_curso_paginacion";
                var ordenamiento = "Titulo";
                var parametros = new Dictionary<string, object>();
                parametros.Add("NombreCurso", request.Titulo);
                return await _paginacion.devolverPaginacion(storeProcedure, request.numeroPagina, request.CantidadElementos, parametros, ordenamiento);
            }
        }
    }
}
