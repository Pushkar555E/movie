import React from 'react';
import { useMovie } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Bookmark, Film, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const { watchlist } = useMovie();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-12 lg:px-24">
        <div className="flex items-center gap-4 mb-12 animate-slide-up">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Bookmark size={32} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-outfit font-black uppercase tracking-tighter">My Watchlist</h1>
            <p className="text-zinc-500 font-medium">Movies you've saved to watch later</p>
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="bg-zinc-900 p-8 rounded-full mb-6">
              <Film size={64} className="text-zinc-700" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
            <p className="text-zinc-500 mb-8 max-w-md">
              Start adding movies your interest you. You can find movies on the home page or by searching.
            </p>
            <Link to="/" className="btn-primary flex items-center gap-2">
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-scale-in">
            {watchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
