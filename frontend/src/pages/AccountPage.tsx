import AuthorizeView from "../components/AuthorizeView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MfaSetup from "../components/MfaSetupPage";

function AccountPage() {

    return(
        <>
            <AuthorizeView>
                <Header/>
                <h1>Congrats, you made it to the account page.</h1>
                <h2>Change your password here. </h2>
                <h2>Update your profile Pic here.</h2>
                <MfaSetup/>
                <Footer/>
            </AuthorizeView>
        </>
    );
}

export default AccountPage;