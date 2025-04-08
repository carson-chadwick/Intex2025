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
        
        [HttpGet("UserRecommendations/{userId}")]
        public IActionResult GetUserRecommendations(int userId)
        {
            var query = _recommenderContext.UserHomeGenreRecs
                .Where(p => p.userId == userId);

            var results = query.ToList();

            return Ok(results);
        }

    }
}
