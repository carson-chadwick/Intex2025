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

        [HttpGet("collab/{showId}")]
        public IActionResult GetCollab(string showId)
        {
            var recs = _recsContext.CollabRecs
                .Where(r => r.Show_Id.ToLower() == showId.ToLower())
                .OrderBy(r => r.Rank)
                .ToList();

            var fullRecs = recs
                .Join(_moviesContext.MoviesTitles,
                    c => c.Rec_Id,
                    m => m.ShowId,
                    (c, m) => new
                    {
                        Title = m.Title,
                        Rank = c.Rank,
                        ShowId = m.ShowId  // 👈 add this
                    })
                .OrderBy(r => r.Rank)
                .ToList();

            return Ok(fullRecs);
        }

        [HttpGet("content/{showId}")]
        public IActionResult GetContent(string showId)
        {
            var recs = _recsContext.ContentRecs
                .Where(r => r.Show_Id.Trim().ToLower() == showId.Trim().ToLower())
                .OrderBy(r => r.Rank)
                .ToList();

            var fullRecs = recs
                .Join(_moviesContext.MoviesTitles,
                    c => c.Rec_Id,
                    m => m.ShowId,
                    (c, m) => new
                    {
                        Title = m.Title,
                        Rank = c.Rank,
                        ShowId = m.ShowId  // 👈 add this
                    })
                .OrderBy(r => r.Rank)
                .ToList();

            return Ok(fullRecs);
        }

        // --- User Home Page ---

        [HttpGet("home/top/{userId}")]
        public IActionResult GetTopPicks(int userId)
        {
            var picks = _recsContext.UserTopPicks
                .Where(p => p.user_id == userId)
                .OrderBy(p => p.rank)
                .Select(p => new {
                    title = p.title,
                    rank = p.rank,
                    userId = p.user_id,
                    showId = p.show_id // ✅ matches frontend key
                })
                .ToList();

            return Ok(picks);
        }

        [HttpGet("home/genre/{userId}")]
        public IActionResult GetGenrePicks(int userId)
        {
        var picks = _recsContext.UserHomeGenreRecs
            .Where(p => p.user_id == userId)
            .OrderBy(p => p.genre)
            .ThenBy(p => p.rank)
            .Select(p => new {
                title = p.title,
                genre = p.genre,
                rank = p.rank,
                userId = p.user_id,
                showId = p.show_id
            })
            .ToList();

            return Ok(picks);
        }
    }
}
