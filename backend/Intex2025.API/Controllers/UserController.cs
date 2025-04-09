using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2025.API.Data; // ✅ this should match your actual namespace
using System.Linq;
using System.Threading.Tasks;

namespace Intex2025.API.Controllers
{
    [Route("user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly MoviesContext _dbContext;

        public UserController(MoviesContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUserId()
        {
            var userEmail = User?.Identity?.Name;

            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized();

            var userId = await _dbContext.MoviesUsers
                .Where(u => u.Email == userEmail)
                .Select(u => u.UserId)
                .FirstOrDefaultAsync();

            if (userId == 0)
                return NotFound("User ID not found.");

            return Ok(new { email = userEmail, user_id = userId });
        }
    }
}
