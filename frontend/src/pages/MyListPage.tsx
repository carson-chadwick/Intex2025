import Header from '../components/Header';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Footer from '../components/Footer';
function MyListPage() {


    return (
        <>
            <AuthorizeView>
                <Header/>
                <p>
                    This My List page is supposed to contain movies that the user has either rated or liked. 
                    This page is extra credit, so it may be done later if time.
                </p>
                {/* <span>
                    <Logout>
                        Logout <AuthorizedUser value="email" />
                    </Logout>
                </span> */}
                <Footer/>
            </AuthorizeView>
        </>
    );
}

export default MyListPage;
