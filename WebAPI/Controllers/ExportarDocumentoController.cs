using Aplicacion.Cursos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [AllowAnonymous]
    public class ExportarDocumentoController : MiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Stream>> getTask()
        {
            return await Mediator.Send(new ExportPDF.Consulta());
        }

    }
}
