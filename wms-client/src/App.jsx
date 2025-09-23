import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Manage from './pages/Manage.jsx';
import Admin from './pages/Admin.jsx';
import Warehouse from './pages/Warehouse.jsx';
import Section from './pages/Section.jsx';
import Error from './pages/Error.jsx';
import Products from './pages/Products.jsx';
import Item from './pages/Item.jsx';
import Action from './pages/Action.jsx';
import UserProfile from './pages/UserProfile.jsx';
import './styles/app.css';
import './utils/axios-config.js'; // Import axios configuration

const AppContent = () => {
  const location = useLocation();

  const protectedRoutes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/profile', element: <Profile /> },
    { path: '/manage', element: <Manage /> },
    { path: '/admin', element: <Admin /> },
    { path: '/warehouse/:id', element: <Warehouse /> },
    { path: '/warehouse/:warehouseId/section/:sectionId', element: <Section /> },
    { path: '/products', element: <Products /> },
    { path: '/item/:itemId', element: <Item /> },
    { path: '/action/:id', element: <Action /> },
    { path: '/user/:id', element: <UserProfile /> },
  ]
  
  return (
    <div className='app'>
      <Navbar />
      <main className={`app ${location.pathname === '/login' ? 'pt-0' : 'pt-20'}`}>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/login' element={<Login />} />
            {protectedRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              } />
            ))}
            <Route path='*' element={<Error />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
