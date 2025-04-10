// AccountPage.tsx
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MfaSetup from "../components/MfaSetupPage";
import "./AccountPage.css";

function AccountPage() {
  return (
    <AuthorizeView>
        <Header />
        <div className="apply-margin"></div>
    
      <div>
        <h1 className="account-heading">Welcome <AuthorizedUser value="email" /></h1>

        <div className="profile-card">
          <h2 className="section-heading">Profile Picture</h2>
          <p className="section-subtext">Update your profile picture below.</p>

          <div className="profile-section">
            <div className="profile-avatar">📸</div>
            <button className="upload-button" disabled>
              Upload (Coming Soon)
            </button>
          </div>
        </div>

        <MfaSetup />
      </div>

      <Footer />
    </AuthorizeView>
  );
}

export default AccountPage; 
