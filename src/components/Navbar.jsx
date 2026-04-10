import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Popcorn, Bookmark, TrendingUp, Menu, X, Mic } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/search?q=${encodeURIComponent(transcript)}`);
    };
    recognition.start();
  };

  return (
    <nav className={`glass-nav transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Popcorn className="text-white" size={24} />
          </div>
          <span className="text-2xl font-outfit font-bold tracking-tighter">
            CINE<span className="text-primary">MATCH</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-zinc-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">Home</Link>
          <Link to="/explore" className="text-zinc-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">Explore</Link>
          <Link to="/watchlist" className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <Bookmark size={14} />
            Watchlist
          </Link>
          
          <form onSubmit={handleSearch} className="relative group flex items-center">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-zinc-900 border border-white/5 text-sm rounded-full py-2 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all w-48 lg:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={16} />
            <button 
                type="button"
                onClick={startVoiceSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-primary transition-colors"
                title="Search by voice"
            >
                <Mic size={16} />
            </button>
          </form>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-white/10 animate-fade-in">
          <div className="flex flex-col p-6 gap-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            </form>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</Link>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Explore</Link>
            <Link to="/trending" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Trending</Link>
            <Link to="/watchlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg font-medium">
              <Bookmark size={20} />
              Watchlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
