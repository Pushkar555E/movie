import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import Explore from './pages/Explore';

const Footer = () => (
  <footer className="py-12 border-t border-white/10 bg-black">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="bg-primary p-1.5 rounded-md">
           <span className="font-bold text-xs uppercase tracking-tighter">CM</span>
        </div>
        <span className="font-outfit font-bold tracking-tighter">CINE<span className="text-primary">MATCH</span></span>
      </div>
      <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} CineMatch Store. Powered by TMDB API.</p>
      <p className="text-zinc-600 text-xs mt-2 italic">Crafted with ❤️ for movie lovers.</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <MovieProvider>
          <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 selection:text-primary transition-colors duration-500">
            <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/trending" element={<Home />} /> {/* Alias for now */}
            </Routes>
          </main>
          <Footer />
        </div>
      </MovieProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
