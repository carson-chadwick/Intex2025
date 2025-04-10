using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Intex2025.API.Controllers;

[ApiController]
[Route("auth")] // all routes prefixed with /auth
public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthController(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
    {
        try
        {
            Console.WriteLine($"[LOGIN ATTEMPT] {request.Email}, RememberMe: {request.RememberMe}");

            if (!ModelState.IsValid)
                return BadRequest("Invalid login request");

            var user = await _signInManager.UserManager.FindByEmailAsync(request.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var passwordValid = await _signInManager.UserManager.CheckPasswordAsync(user, request.Password);
            if (!passwordValid)
                return Unauthorized(new { message = "Invalid email or password." });

            var mfaEnabled = await _signInManager.UserManager.GetTwoFactorEnabledAsync(user);
            if (mfaEnabled)
            {
                return Ok(new
                {
                    requiresMfa = true,
                    email = user.Email
                });
            }

            // ✅ Get the user's roles
            var roles = await _signInManager.UserManager.GetRolesAsync(user);

            // ✅ Build the claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? "")
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // ✅ Build identity and principal
            var identity = new ClaimsIdentity(claims, IdentityConstants.ApplicationScheme);
            var principal = new ClaimsPrincipal(identity);

            // ✅ Sign in manually to include roles in the cookie
            await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal, new AuthenticationProperties
            {
                IsPersistent = request.RememberMe
            });

            return Ok(new { message = "Login successful" });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[LOGIN ERROR] {ex.Message}");
            return StatusCode(500, "Internal server error during login.");
        }
    }
}

public class UserLoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}
