using Microsoft.AspNetCore.Mvc;
using Intex2025.API.Data;

namespace Intex2025.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendController : ControllerBase
    {
        private readonly MoviesContext _moviesContext;
        private readonly RecommendationsContext _recsContext;

        public RecommendController(MoviesContext moviesContext, RecommendationsContext recsContext)
        {
            _moviesContext = moviesContext;
            _recsContext = recsContext;
        }

        // --- Show Details Page ---

        [HttpGet("collab/{showId}")]
        public IActionResult GetCollab(string showId)
        {
            var recs = _recsContext.CollabRecs
                .Where(r => r.Show_Id == showId)
                .OrderBy(r => r.Rank)
                .ToList();
            return Ok(recs);
        }

        [HttpGet("content/{showId}")]
        public IActionResult GetContent(string showId)
        {
            var recs = _recsContext.ContentRecs
                .Where(r => r.Show_Id == showId)
                .OrderBy(r => r.Rank)
                .ToList();
            return Ok(recs);
        }

        // --- User Home Page ---

        [HttpGet("home/top/{userId}")]
        public IActionResult GetTopPicks(int userId)
        {
            var picks = _recsContext.UserTopPicks
                .Where(p => p.User_Id == userId)
                .OrderBy(p => p.Rank)
                .ToList();
            return Ok(picks);
        }

        [HttpGet("home/genre/{userId}")]
        public IActionResult GetGenrePicks(int userId)
        {
            var picks = _recsContext.UserHomeGenreRecs
                .Where(p => p.User_Id == userId)
                .OrderBy(p => p.Genre)
                .ThenBy(p => p.Rank)
                .ToList();
            return Ok(picks);
        }
    }
}
