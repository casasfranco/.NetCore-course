using Microsoft.EntityFrameworkCore;

namespace Persistencia.Config
{
    public class ConfigSettings
    {
        public ConfigSettings(ModelBuilder modelBuilder)
        {
            new PrecioConfig(modelBuilder);
        }
    }
}
