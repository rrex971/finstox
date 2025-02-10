import React from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Home from './screens/Home'
import SearchResults from './screens/SearchResults';
import NotFound from './screens/NotFound';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';


const App = () => {
  const location = useLocation();
  return (
      <div className='bg-woodsmoke-950 bg-main bg-cover bg-no-repeat min-w-screen'>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer className="absolute bottom-0 left-0"/>
      </div>
  );
};

export default App;

