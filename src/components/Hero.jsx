import { Play, Info, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl, movieService } from '../services/tmdb';

const Hero = ({ movie, loading }) => {
  if (loading) {
    return <div className="h-[70vh] md:h-[85vh] skeleton w-full"></div>;
  }

  if (!movie) return null;

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-24 px-4 md:px-12 lg:px-24">
        <div className="max-w-2xl animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded italic">TOP TRENDING</span>
            <div className="flex items-center gap-1 text-accent font-bold">
              <Star size={16} fill="currentColor" />
              {movie.vote_average?.toFixed(1)}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black mb-4 uppercase tracking-tighter leading-none">
            {movie.title}
          </h1>
          
          <p className="text-zinc-300 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-4 font-medium leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to={`/movie/${movie.id}`}
              className="btn-primary flex items-center gap-2 group"
            >
              <Play fill="currentColor" size={20} className="group-hover:scale-110 transition-transform" />
              Play Now
            </Link>
            <Link 
              to={`/movie/${movie.id}`}
              className="btn-secondary flex items-center gap-2 group"
            >
              <Info size={20} className="group-hover:rotate-12 transition-transform" />
              More Info
            </Link>
            <button 
              onClick={() => {
                // Fetch a random popular movie and navigate to it
                movieService.getPopular().then(movies => {
                  const random = movies[Math.floor(Math.random() * movies.length)];
                  window.location.href = `/movie/${random.id}`;
                });
              }}
              className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-white/5 rounded-md flex items-center gap-2 transition-all group italic font-medium"
            >
              🎲 Surprise Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
