using System.Text.Json;
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
        
        
        
        
        
        // [HttpGet("HomePageRecommendation/{userId}")]
        // public IActionResult GetRecommendations(int userId)
        // {
        //     var start = new System.Diagnostics.ProcessStartInfo
        //     {
        //         FileName = "python3",
        //         Arguments = $"Recommender_HomePage_Backend.py {userId}",
        //         RedirectStandardOutput = true,
        //         UseShellExecute = false,
        //         CreateNoWindow = true
        //     };
        //
        //     using var process = System.Diagnostics.Process.Start(start);
        //     using var reader = process.StandardOutput;
        //     string result = reader.ReadToEnd();
        //
        //     var recommendations = JsonSerializer.Deserialize<List<string>>(result); // Or your custom object
        //     return Ok(recommendations);
        // }
    }
}
