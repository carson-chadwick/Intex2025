import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MfaSetup from '../components/MfaSetupPage';
import './AccountPage.css';
import Cookies from 'js-cookie';

// 🌐 Translations
const translations: Record<
  string,
  {
    welcome: string;
    profilePicture: string;
    updateText: string;
    uploadButton: string;
  }
> = {
  en: {
    welcome: 'Welcome',
    profilePicture: 'Profile Picture',
    updateText: 'Update your profile picture below.',
    uploadButton: 'Upload (Coming Soon)',
  },
  es: {
    welcome: 'Bienvenido',
    profilePicture: 'Foto de perfil',
    updateText: 'Actualiza tu foto de perfil abajo.',
    uploadButton: 'Subir (Próximamente)',
  },
};

function AccountPage() {
  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  return (
    <AuthorizeView>
      <Header />
      <div className="apply-margin"></div>

      <div>
        <h1 className="account-heading">
          {t.welcome} <AuthorizedUser value="email" />
        </h1>

        <div className="profile-card">
          <h2 className="section-heading">{t.profilePicture}</h2>
          <p className="section-subtext">{t.updateText}</p>

          <div className="profile-section">
            <div className="profile-avatar">📸</div>
            <button className="upload-button" disabled>
              {t.uploadButton}
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
