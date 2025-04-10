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
                        ShowId = m.ShowId 
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
                    showId = p.show_id
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
        [HttpGet("landing/top-hits")]
        public IActionResult GetTopHits()
        {
            var topHits = _moviesContext.MoviesRatings
                .Where(r => r.Rating.HasValue && r.ShowId != null)
                .GroupBy(r => r.ShowId)
                .Select(g => new
                {
                    ShowId = g.Key,
                    AvgRating = g.Average(r => r.Rating.Value),
                    RatingCount = g.Count()
                })
                .Where(g => g.RatingCount >= 3)
                .OrderByDescending(g => g.AvgRating)
                .Take(12)
                .ToList();

            var resultsWithTitles = topHits
                .Join(
                    _moviesContext.MoviesTitles,
                    rating => rating.ShowId,
                    title => title.ShowId,
                    (rating, title) => new
                    {
                        showId = rating.ShowId,
                        title = title.Title ?? "Untitled"
                    }
                )
                .ToList();

            return Ok(resultsWithTitles);
        }
        
        [HttpGet("landing/editors-picks")]
        public IActionResult GetEditorsPicks()
        {
            // You can customize this list later or even pull it from a database table
            var editorsPickIds = new List<string>
            {
                "s8052", "s461", "s574", "s595", "s8083", "s341", "s1846", "s9", "s754", "s7128", "s2520", "s6614", "s7571", "s1000", "s1001", "s1002", "s1003", "s1004", "s1005", "s1006", "s1007", "s1008", "s1009", "s1010"
            };

            var picks = _moviesContext.MoviesTitles
                .Where(m => m.ShowId != null && editorsPickIds.Contains(m.ShowId))
                .Select(m => new
                {
                    showId = m.ShowId,
                    title = m.Title ?? "Untitled"
                })
                .ToList();

            return Ok(picks);
        }
        
        [HttpGet("landing/recently-added")]
        public IActionResult GetRecentlyAdded()
        {
            var recent = _moviesContext.MoviesTitles
                .Where(m => m.ReleaseYear.HasValue && m.Title != null)
                .OrderByDescending(m => m.ReleaseYear)
                .Take(12)
                .Select(m => new
                {
                    showId = m.ShowId,
                    title = m.Title ?? "Untitled"
                })
                .ToList();

            return Ok(recent);
        }
        
        
    }
}
