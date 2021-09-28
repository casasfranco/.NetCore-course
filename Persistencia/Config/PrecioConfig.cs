using Dominio;
using Microsoft.EntityFrameworkCore;

namespace Persistencia.Config
{
    public class PrecioConfig
    {
        public PrecioConfig(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Precio>().Property(p => p.PrecioActual).HasColumnName("PrecioActual").HasColumnType("decimal(18, 4)");
            modelBuilder.Entity<Precio>().Property(p => p.Promocion).HasColumnName("Promocion").HasColumnType("decimal(18, 4)");
        }

    }
}
