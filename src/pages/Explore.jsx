import React, { useState, useEffect } from 'react';
import { movieService } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Filter, Search as SearchIcon, X, SlidersHorizontal, Star, Calendar, ChevronDown } from 'lucide-react';

const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const moods = [
    { name: 'Popcorn & Fun', id: '16,35', icon: '🍿' },
    { name: 'Adrenaline Rush', id: '28,12', icon: '🔥' },
    { name: 'Tear Jerker', id: '18,10749', icon: '😭' },
    { name: 'Pure Terror', id: '27,53', icon: '😱' },
    { name: 'Brain Food', id: '878,9648', icon: '🧠' },
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await movieService.getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchFilteredMovies = async () => {
      setLoading(true);
      try {
        const params = {
            with_genres: selectedMood || selectedGenre,
            primary_release_year: selectedYear,
            'vote_average.gte': selectedRating,
            sort_by: 'popularity.desc'
        };
        
        const data = await movieService.discoverMovies(params);
        setMovies(data);
      } catch (error) {
        console.error("Error filtering movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredMovies();
  }, [selectedGenre, selectedYear, selectedRating, selectedMood]);

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-outfit font-black uppercase tracking-tighter mb-4">
              Explore <span className="text-primary">Movies</span>
            </h1>
            <p className="text-zinc-500 font-medium max-w-xl">
              Use the filters below to find exactly what you're looking for. From hidden gems to blockbuster hits.
            </p>
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-xs border border-white/5"
          >
            <SlidersHorizontal size={18} className={showFilters ? 'text-primary' : ''} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Mood Selector */}
        <div className="flex flex-wrap gap-4 mb-12 animate-fade-in">
          {moods.map(mood => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(selectedMood === mood.id ? '' : mood.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 group ${
                selectedMood === mood.id 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-zinc-900 border-white/5 hover:border-white/10'
              }`}
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{mood.icon}</span>
              <span className={`font-bold uppercase tracking-tighter text-sm ${selectedMood === mood.id ? 'text-white' : 'text-zinc-400'}`}>
                {mood.name}
              </span>
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-8 glass-card animate-scale-in">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Filter size={12} /> Genre
              </label>
              <select 
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Genres</option>
                {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Calendar size={12} /> Release Year
              </label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">Any Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Star size={12} /> Minimum Rating
              </label>
              <select 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">Any Rating</option>
                {[9, 8, 7, 6, 5].map(r => <option key={r} value={r}>{r}+ Stars</option>)}
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end">
                <button 
                  onClick={() => { setSelectedGenre(''); setSelectedYear(''); setSelectedRating(''); }}
                  className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                    Reset All Filters
                </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] skeleton shimmer" />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <SearchIcon size={64} className="text-zinc-800 mb-6" />
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">No matches found</h2>
            <p className="text-zinc-500 max-w-md">Try adjusting your filters to find more movies.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-fade-in">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
