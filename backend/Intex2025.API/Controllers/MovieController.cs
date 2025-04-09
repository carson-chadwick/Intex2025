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

            // ✅ Step 1: Define the mapping from property name to display name
            var genreMap = new Dictionary<string, string>
            {
                { "RealityTv", "Reality TV" },
                { "TvAction", "TV Action" },
                { "TvComedies", "TV Comedies" },
                { "TvDramas", "TV Dramas" },
                { "TalkShowsTvComedies", "Talk Shows TV Comedies" },
                { "KidsTv", "Kids' TV" },
                { "BritishTvShowsDocuseriesInternational", "British TV Shows Docuseries International" },
                {"LanguageTvShows", "Language TV Shows"},
                {"FamilyMovies", "Family Movies"},
                {"AnimeSeriesInternationalTvShows", "Anime Series International TV Shows"},
                // 🔧 Add more edge cases as needed, or fallback logic will be used
            };

            // ✅ Step 2: Dynamically collect genres
            var genreList = movie.GetType()
                .GetProperties()
                .Where(p =>
                    (p.PropertyType == typeof(int) || p.PropertyType == typeof(int?)) &&
                    p.GetValue(movie) != null &&
                    (int)p.GetValue(movie)! == 1
                )
                .Select(p => genreMap.ContainsKey(p.Name)
                        ? genreMap[p.Name]
                        : p.Name.Replace('_', ' ') // fallback: replace underscores with spaces
                )
                .ToList();

            // ✅ Step 3: Return movie data + genres
            return Ok(new
            {
                movie.ShowId,
                movie.Title,
                movie.Description,
                movie.Cast,
                movie.Director,
                movie.ReleaseYear,
                movie.Rating,
                movie.Duration,
                movie.Country,
                Genres = genreList
            });
        }
        
        [HttpGet("GetAverageRating/{showId}")]
        public IActionResult GetAverageRating(string showId)
        {
            var ratingsQuery = _movieContext.MoviesRatings
                .Where(r => r.ShowId == showId);

            var ratingsCount = ratingsQuery.Count();
    
            if (ratingsCount == 0)
            {
                return Ok(new { averageRating = 0.0, ratingsCount = 0 });
            }

            var rawAverage = ratingsQuery.Average(r => r.Rating); // this is double?

            var roundedAverage = Math.Round(rawAverage.Value * 2, MidpointRounding.AwayFromZero) / 2.0;
    
            return Ok(new { averageRating = roundedAverage, ratingsCount });
        }
        
        [HttpGet("user/{userId}/{showId}")]
        public IActionResult GetUserRating(int userId, string showId)
        {
            var rating = _movieContext.MoviesRatings
                .FirstOrDefault(r => r.UserId == userId && r.ShowId == showId);

            // If no rating exists, return an empty/default response
            if (rating == null)
            {
                return Ok(new
                {
                    userId,
                    showId,
                    rating = (int?)null // nullable to signal "not rated"
                });
            }

            return Ok(new
            {
                userId = rating.UserId,
                showId = rating.ShowId,
                rating = rating.Rating
            });
        }
        
        [HttpPost("SubmitOrUpdateRating")]
        public IActionResult SubmitOrUpdateRating([FromBody] MoviesRating input)
        {
            if (input.UserId == null || string.IsNullOrEmpty(input.ShowId) || input.Rating == null)
            {
                return BadRequest("Missing required fields.");
            }

            if (input.Rating < 1 || input.Rating > 5)
            {
                return BadRequest("Rating must be between 1 and 5.");
            }

            var existingRating = _movieContext.MoviesRatings
                .FirstOrDefault(r => r.UserId == input.UserId && r.ShowId == input.ShowId);

            if (existingRating != null)
            {
                existingRating.Rating = input.Rating;
                _movieContext.MoviesRatings.Update(existingRating);
            }
            else
            {
                _movieContext.MoviesRatings.Add(new MoviesRating
                {
                    UserId = input.UserId,
                    ShowId = input.ShowId,
                    Rating = input.Rating
                });
            }

            _movieContext.SaveChanges();

            return Ok(new { message = "Rating saved successfully." });
        }
    }
}
