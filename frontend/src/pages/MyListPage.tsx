import Header from '../components/Header';
import AuthorizeView from '../components/AuthorizeView';
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
                <Footer/>
            </AuthorizeView>
        </>
    );
}

export default MyListPage;
