import AuthorizeView from "../components/AuthorizeView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivacyInfo from "../components/PrivacyInfo";
function PrivacyPageLoggedIn() {

    return (
        <>  
            <AuthorizeView>
                <Header/>
                <PrivacyInfo/>
                <Footer/>
            </AuthorizeView>
        </>
    );
}


export default PrivacyPageLoggedIn;