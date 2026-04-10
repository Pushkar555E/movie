import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon, Loader2, Frown } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await movieService.searchMovies(query);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [query]);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        {/* Search Input for page */}
        <div className="mb-12">
            <h1 className="text-3xl font-outfit font-black uppercase tracking-tighter mb-2">
                Search Results
            </h1>
            <p className="text-zinc-500 font-medium">
                Found {results.length} results for <span className="text-white">"{query}"</span>
            </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-primary animate-spin mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Searching the multiverse...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Frown size={64} className="text-zinc-800 mb-6" />
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-zinc-500">Try checking for typos or searching for something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-fade-in">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
