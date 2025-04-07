using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace Intex2025.API.Controllers;

[ApiController]
[Route("[controller]")]
[EnableCors("AllowFrontend")]
public class LoginController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;

    public LoginController(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
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
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}
