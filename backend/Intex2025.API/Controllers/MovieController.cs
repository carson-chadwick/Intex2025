using System.Text.Json;
using Intex2025.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Intex2025.API.Controllers
{
    [Route("Movie")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MoviesContext _movieContext;

        public MovieController(MoviesContext context)
        {
            _movieContext = context;
        }

    [HttpGet("AllMovies")]
    public IActionResult GetAllMovies(
        int pageSize,
        int pageNum,
        string? search,
        string? director,
        string? sortBy,
        string? order,
        string? genre // ✅ New filter param
    )
    {
        var query = _movieContext.MoviesTitles.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(m => m.Title != null && m.Title.ToLower().Contains(search.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(director))
        {
            query = query.Where(m => m.Director != null && m.Director.ToLower().Contains(director.ToLower()));
        }

        // ✅ Genre filter (for int-based flags like 0/1)
        if (!string.IsNullOrWhiteSpace(genre))
        {
            Console.WriteLine($"🔍 Incoming genre filter: {genre}");

            // Convert first character to uppercase (camelCase → PascalCase)
            var genrePascal = char.ToUpper(genre[0]) + genre.Substring(1);

            var property = typeof(MoviesTitle).GetProperties()
                .FirstOrDefault(p => string.Equals(p.Name, genrePascal, StringComparison.Ordinal));

            if (property != null && (property.PropertyType == typeof(int) || property.PropertyType == typeof(int?)))
            {
                Console.WriteLine($"✅ Filtering by property: {property.Name}");
                query = query.Where(m => EF.Property<int?>(m, property.Name) == 1);
            }
            else
            {
                Console.WriteLine($"❌ Property not found or not numeric: {genre}");
            }
        }



            // Apply sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
        {
            bool ascending = order?.ToLower() != "desc";

            query = sortBy.ToLower() switch
            {
                "title" => ascending ? query.OrderBy(m => m.Title) : query.OrderByDescending(m => m.Title),
                "releaseyear" => ascending ? query.OrderBy(m => m.ReleaseYear) : query.OrderByDescending(m => m.ReleaseYear),
                "rating" => ascending ? query.OrderBy(m => m.Rating) : query.OrderByDescending(m => m.Rating),
                _ => query
            };
        }

        var totalNumMovies = query.Count();

        var movies = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            movies,
            totalNumMovies
        });
    }



        // POST: /Movie/AddMovie
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle movie)
        {
            if (movie == null)
            {
                return BadRequest("Invalid movie object.");
            }

            _movieContext.MoviesTitles.Add(movie);
            _movieContext.SaveChanges();
            return Ok(new { message = "Movie added successfully." });
        }

        // PUT: /Movie/EditMovie/{showId}
        [HttpPut("EditMovie/{showId}")]
        public IActionResult EditMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (existingMovie == null)
            {
                return NotFound("Movie not found.");
            }

            _movieContext.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);
            _movieContext.SaveChanges();

            return Ok(new { message = "Movie updated successfully." });
        }

        // DELETE: /Movie/DeleteMovie/{showId}
        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
            {
                return NotFound("Movie not found.");
            }

            _movieContext.MoviesTitles.Remove(movie);
            _movieContext.SaveChanges();

            return Ok(new { message = "Movie deleted successfully." });
        }

        [HttpGet("GetMoviesByShowId/{showId}")]
        public IActionResult GetMoviesByShowId(string showId)
        {
            var movie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
            {
                return NotFound("Movie not found.");
            }

            return Ok(movie);
        }
    }
}
