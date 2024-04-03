import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Home from "../Main/HomePage";


function Layout(){
    return(
        <div>
            <Header />
            <Home/>
            <Footer />
        </div>
    );
}
export default Layout;