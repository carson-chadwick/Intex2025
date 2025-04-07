using Intex2025.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex2025.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MoviesContext _movieContext;
        
        public MovieController(MoviesContext temp) => _movieContext = temp;
        
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1)
        {
            var query = _movieContext.MoviesTitles.AsQueryable();

            var totalNumProjects = query.Count();

            var movieReturn = query
                .Skip((pageNum-1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someObject = new
            {
                Movies = movieReturn,
                TotalNumMovies = totalNumProjects
            };

            return Ok(someObject);
        }
        
    }
}
