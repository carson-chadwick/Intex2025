import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivacyInfo from "../components/PrivacyInfo";
function PrivacyPageLoggedIn() {

    return (
        <>  
            <AuthorizeView>
                <Header/>
                <h1>Welcome <AuthorizedUser value="email" /></h1>
                <PrivacyInfo/>
                <Footer/>
            </AuthorizeView>
        </>
    );
}


export default PrivacyPageLoggedIn;