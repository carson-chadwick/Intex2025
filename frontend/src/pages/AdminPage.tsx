import Header from '../components/Header';
import Logout from '../components/Logout';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
function AdminPage() {

    return (
        <>
            <AuthorizeView>
                <Header/>
                <h1>Hello I am the admin page</h1>
                <span>
                    <Logout>
                        Logout <AuthorizedUser value="email" />
                    </Logout>
                </span>
            </AuthorizeView>
        </>
    );
}

export default AdminPage;
