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

        // GET: /Movie/AllMovies
        [HttpGet("AllMovies")]
        public IActionResult GetAllMovies(
            int pageSize,
            int pageNum,
            string? search,
            string? director,
            string? sortBy,
            string? order
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
