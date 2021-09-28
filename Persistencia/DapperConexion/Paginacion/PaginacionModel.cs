using System.Collections.Generic;

namespace Persistencia.DapperConexion.Paginacion
{
    public class PaginacionModel
    {
        public List<IDictionary<string, object>> ListaRecords { get; set; } //  [ {CursoId: "1234", "Titulo":"aspNet"}, {CursoId: "945", "Titulo":"react"} ]
        public int TotalRecords { get; set; }
        public int NumeroPaginas { get; set; }
    }
}
