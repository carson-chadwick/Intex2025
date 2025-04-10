using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2025.API.Data;
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

        // ✅ Existing: Get user based on the current session
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

        // ✅ New: Get user info by email explicitly (used by HomePage fetch)
        [HttpGet("by-email/{email}")]
        [AllowAnonymous] // You can remove this if you want to keep it restricted
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email is required.");

            var user = await _dbContext.MoviesUsers
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return NotFound();

            return Ok(new
            {
                user_id = user.UserId,
                email = user.Email
            });
        }
    }
}
