import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Warehouse from './pages/Warehouse.jsx';
import Section from './pages/Section.jsx';
import Error from './pages/Error.jsx';
import Products from './pages/Products.jsx';
import Item from './pages/Item.jsx';
import './styles/app.css';
import './utils/axios-config.js'; // Import axios configuration

const AppContent = () => {
  const location = useLocation();

  return (
    <div className='app'>
      <Navbar />
      <main className='app pt-20'>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={
              <ProtectedRoute requiredRoles={['Admin', 'Manager']}>
                <Register />
              </ProtectedRoute>
            } />
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/warehouse/:id' element={
              <ProtectedRoute>
                <Warehouse />
              </ProtectedRoute>
            } />
            <Route path='/warehouse/:warehouseId/section/:sectionId' element={
              <ProtectedRoute>
                <Section />
              </ProtectedRoute>
            } />
            <Route path='/products' element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            } />
            <Route path='/item/:itemId' element={
              <ProtectedRoute>
                <Item />
              </ProtectedRoute>
            } />
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
