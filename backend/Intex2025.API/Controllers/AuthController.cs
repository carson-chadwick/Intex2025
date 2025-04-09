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

        // ✅ First, check if password is valid
        var passwordValid = await _signInManager.UserManager.CheckPasswordAsync(user, request.Password);
        if (!passwordValid)
            return Unauthorized(new { message = "Invalid email or password." });

        // ✅ Check if the user has MFA enabled
        var mfaEnabled = await _signInManager.UserManager.GetTwoFactorEnabledAsync(user);
        if (mfaEnabled)
        {
            return Ok(new
            {
                requiresMfa = true,
                email = user.Email
            });
        }


        // ✅ No MFA — proceed to full sign-in
        var result = await _signInManager.PasswordSignInAsync(
            user,
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

public class UserLoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
}
