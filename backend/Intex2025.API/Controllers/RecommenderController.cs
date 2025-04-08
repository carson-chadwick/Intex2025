using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecommenderController : ControllerBase
    {
        private CineRecsContext _recommenderContext;
        
        public RecommenderController(CineRecsContext temp) => _recommenderContext = temp;
    }
}
