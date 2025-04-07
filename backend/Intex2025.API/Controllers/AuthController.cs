using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    try
    {
        Console.WriteLine($"[LOGIN ATTEMPT] {request.Email}, RememberMe: {request.RememberMe}");

        if (!ModelState.IsValid)
            return BadRequest("Invalid login request");

        var result = await _signInManager.PasswordSignInAsync(
            request.Email,
            request.Password,
            isPersistent: request.RememberMe,
            lockoutOnFailure: false);

        if (result.Succeeded)
            return Ok(new { message = "Login successful" });

        return Unauthorized(new { message = "Invalid email or password." });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[LOGIN ERROR] {ex.Message}");
        return StatusCode(500, "Internal server error during login.");
    }
}

}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}
