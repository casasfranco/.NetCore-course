using System.Collections.Generic;
using System;
namespace Dominio
{
    public class Curso
    {
        public int CursoId { get; set; }
        public string Titutlo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public byte[] FotoPortada { get; set; }

        public Precio PrecioPromocion { get; set; }
        public ICollection<Comentario> ComentarioLista { get; set; }
        public ICollection<CursoInstructor> InstructoresLink { get; set; }
    }
}