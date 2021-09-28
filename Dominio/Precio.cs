using System;

namespace Dominio
{
    public class Precio
    {
        public Guid PrecioId { get; set; }
        public decimal PrecioActual { get; set; }
        public decimal Promocion { get; set; }
        public Guid CursoId { get; set; }
        public Curso Curso { get; set; }
    }
}