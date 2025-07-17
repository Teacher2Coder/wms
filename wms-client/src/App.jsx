import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Warehouse from './pages/Warehouse.jsx';
import Error from './pages/Error.jsx';
import './styles/app.css';

const App = () => {
  const location = useLocation();

  return (
    <div className='app'>
      <Navbar />
      <main className='app pt-20'>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/warehouse/:id' element={<Warehouse />} />
            <Route path='*' element={<Error />} />
          </Routes>
      </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
