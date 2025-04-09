import AuthorizeView from "../components/AuthorizeView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivacyInfo from "../components/PrivacyInfo";
function PrivacyPage() {

    return (
        <>  
            <AuthorizeView>
                <Header/>
            </AuthorizeView>
            <PrivacyInfo/>
            <Footer/>
        </>
    );
}


export default PrivacyPage;