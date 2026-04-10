import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Plus, Check } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import { useMovie } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovie();
  const alreadyInWatchlist = isInWatchlist(movie.id);

  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (alreadyInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card group">
      <img
        src={getImageUrl(movie.poster_path, 'w500')}
        alt={movie.title}
        loading="lazy"
        className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      <div className="movie-card-overlay">
        <div className="mb-2">
          <h3 className="text-sm font-bold line-clamp-2 leading-tight uppercase font-outfit">{movie.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-accent text-xs font-bold">
              <Star size={12} fill="currentColor" />
              {movie.vote_average?.toFixed(1)}
            </div>
            <span className="text-zinc-400 text-xs">
              {movie.release_date?.split('-')[0]}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-white text-black p-1.5 rounded-md flex items-center justify-center gap-1 hover:bg-white/90 transition-colors">
            <Play size={14} fill="currentColor" />
            <span className="text-[10px] font-bold">DETAILS</span>
          </button>
          <button 
            onClick={handleWatchlist}
            className={`p-1.5 rounded-md border flex items-center justify-center transition-all ${
              alreadyInWatchlist 
                ? 'bg-primary border-primary text-white' 
                : 'bg-zinc-800/80 border-zinc-700 text-white hover:bg-zinc-700'
            }`}
          >
            {alreadyInWatchlist ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
