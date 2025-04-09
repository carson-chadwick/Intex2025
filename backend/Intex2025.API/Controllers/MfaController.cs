using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Intex2025.API.Models;

namespace Intex2025.API.Controllers // Make sure this is present
{
    [Route("mfa")]
    [ApiController]
    public class MfaController : ControllerBase
    {
        // ✅ Step 2: Declare these two fields
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        // ✅ Step 1: Inject both services
        public MfaController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("setup")]
        public async Task<IActionResult> SetupMfa([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound("User not found");

            var key = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(key))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                key = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            var uri = $"otpauth://totp/Intex2025:{email}?secret={key}&issuer=Intex2025&digits=6";

            return Ok(new
            {
                sharedKey = key,
                qrCodeUri = uri
            });
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyMfa([FromBody] MfaVerifyDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return NotFound("User not found");

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(
                user,
                _userManager.Options.Tokens.AuthenticatorTokenProvider,
                dto.Code
            );

            if (!isValid)
            {
                return BadRequest("Invalid verification code");
            }

            await _userManager.SetTwoFactorEnabledAsync(user, true);

            // ✅ Optional: Sign the user in immediately after verification
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok("MFA enabled successfully");
        }

        [HttpPost("challenge")]
        public async Task<IActionResult> ChallengeMfa([FromBody] MfaVerifyDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return NotFound(new { message = "User not found" });

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(
                user,
                _userManager.Options.Tokens.AuthenticatorTokenProvider,
                dto.Code
            );

            if (!isValid)
                return BadRequest(new { message = "Invalid verification code." });

            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(new { message = "MFA success" });
        }


    }
}
