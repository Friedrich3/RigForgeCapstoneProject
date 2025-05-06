import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppNavbar from './components/AppNavbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/Footer';
import NotFound from './components/support/NotFound';
import BuildPage from './components/BuildPage';
import { AutoLogin } from './redux/actions/AccountApi';
import ProductsMain from './components/products/ProductsMain';
import ProductDetail from './components/products/ProductDetail';
import Unauthorized from './components/support/Unauthorized';
import ProtectedRoute from './components/support/ProtectedRoute';
import MyAccount from './components/account/MyAccount';
import BackofficeMain from './components/backoffice/Backoffice';
import BuildsGallery from './components/builds/BuildsGallery';
import BuildViewer from './components/builds/BuildViewer';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AutoLogin());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#0a0a14" }}>
        <AppNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuildPage />} />
            <Route path="/products/:category" element={<ProductsMain />} />
            <Route path="/products/:category/:productId" element={<ProductDetail />} />            
            
            <Route path="/Account/:section"element={<ProtectedRoute children={<MyAccount/>} />} />{/*mettere allowedRoles={[Admin,Moderator]}   per una protezione maggiore quando si crea*/}
            
            <Route path="/Account/login" element={<Login />} />
            <Route path="/Account/register" element={<Register />} />

            <Route path="/Backoffice/:section/*"element={<ProtectedRoute children={<BackofficeMain/>} allowedRoles={["Admin"]} />} />

            <Route path="/Builds" element={<BuildsGallery />} />
            <Route path="/Builds/:buildId" element={<BuildViewer />} />

            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
