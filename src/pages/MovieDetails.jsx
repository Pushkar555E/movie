import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Check, Star, Clock, Calendar, Bookmark, DollarSign, TrendingUp, Info } from 'lucide-react';
import { movieService, getImageUrl } from '../services/tmdb';
import { useMovie } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import Modal from '../components/Modal';
import { rankRecommendations } from '../utils/recommendations';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [smartRecs, setSmartRecs] = useState([]);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovie();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
        addToRecentlyViewed(data);
        
        // Combine Similar and Recommendations for the Smart Engine
        const combinedCandidates = [
          ...(data.similar?.results || []),
          ...(data.recommendations?.results || [])
        ];
        // Filter unique by ID
        const uniqueCandidates = Array.from(new Map(combinedCandidates.map(m => [m.id, m])).values());
        
        const ranked = rankRecommendations(data, uniqueCandidates);
        setSmartRecs(ranked.slice(0, 12));
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Decrypting database...</p>
      </div>
    );
  }

  if (!movie) return <div className="min-h-screen pt-20 text-center">Movie not found</div>;

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer') || movie.videos?.results?.[0];
  const alreadyInWatchlist = isInWatchlist(movie.id);

  return (
    <div className="min-h-screen pb-20">
      {/* Backdrop Section */}
      <div className="relative h-[70vh] md:h-[85vh] w-full">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center p-4 md:p-12 lg:px-24">
           <div className="flex flex-col md:flex-row items-center md:items-end gap-12 w-full max-w-7xl mx-auto">
              <div className="relative shrink-0 group">
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-48 md:w-80 rounded-2xl shadow-primary/20 shadow-2xl border border-white/10 animate-scale-in"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-white font-black text-xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-background italic">
                  {movie.vote_average?.toFixed(1)}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left animate-slide-up">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                  {movie.genres?.map(g => (
                    <span key={g.id} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5">{g.name}</span>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-7xl font-outfit font-black mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm font-bold text-zinc-400 mb-8 uppercase tracking-wide">
                  <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {movie.runtime}m</div>
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {new Date(movie.release_date).getFullYear()}</div>
                  <div className="flex items-center gap-2 underline underline-offset-4 decoration-primary text-white italic">{movie.status}</div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  {trailer && (
                    <button 
                      onClick={() => setIsTrailerOpen(true)}
                      className="btn-primary flex items-center gap-2 px-8 py-3"
                    >
                      <Play fill="currentColor" size={24} /> Watch Trailer
                    </button>
                  )}
                  <button 
                    onClick={() => alreadyInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                    className={`btn-secondary flex items-center gap-2 px-8 py-3 ${alreadyInWatchlist ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-white/10'}`}
                  >
                    {alreadyInWatchlist ? <Check size={24} /> : <Bookmark size={24} />}
                    {alreadyInWatchlist ? 'Watchlisted' : 'Save to Watchlist'}
                  </button>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 -mt-10 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Budget</span>
            <span className="text-xl font-outfit font-black text-white">
              {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
            </span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Revenue</span>
            <span className="text-xl font-outfit font-black text-primary">
              {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}
            </span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Popularity</span>
            <span className="text-xl font-outfit font-black text-white">
              {movie.popularity?.toFixed(0)}
            </span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Votes</span>
            <span className="text-xl font-outfit font-black text-white">
              {movie.vote_count?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-primary" size={24} />
              <h2 className="text-2xl font-outfit font-black uppercase tracking-tighter">Storyline</h2>
            </div>
            <p className="text-zinc-400 text-xl leading-relaxed font-medium">
              {movie.overview}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-outfit font-black uppercase tracking-tighter mb-10 pb-4 border-b border-white/5">The Creators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {movie.credits?.cast?.slice(0, 5).map(person => (
                <div key={person.id} className="text-center group">
                  <div className="aspect-square overflow-hidden rounded-2xl mb-4 border border-white/5 shadow-xl transition-all duration-500 group-hover:border-primary group-hover:-translate-y-2">
                    <img
                      src={getImageUrl(person.profile_path, 'w185')}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h4 className="font-bold text-sm leading-tight mb-1 truncate">{person.name}</h4>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
           <section className="sticky top-32">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-primary" size={20} />
              <h2 className="text-xl font-outfit font-black uppercase tracking-tighter">Smart Matches</h2>
            </div>
            <p className="text-xs text-zinc-500 mb-6 italic">Based on genre overlap, rating proximity, and release era.</p>
            <div className="grid grid-cols-1 gap-4">
              {smartRecs.slice(0, 5).map(rec => (
                <Link to={`/movie/${rec.id}`} key={rec.id} className="flex gap-4 p-3 bg-zinc-900/50 rounded-xl hover:bg-zinc-800 transition-all group border border-transparent hover:border-white/5">
                  <img
                    src={getImageUrl(rec.poster_path, 'w185')}
                    alt={rec.title}
                    className="w-16 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{rec.title}</h4>
                    <div className="flex items-center gap-3 mt-2">
                       <div className="flex items-center gap-1">
                        <Star size={10} fill="currentColor" className="text-accent" />
                        <span className="text-[10px] font-bold">{rec.vote_average?.toFixed(1)}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold">{new Date(rec.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {trailer && (
        <Modal 
          isOpen={isTrailerOpen} 
          onClose={() => setIsTrailerOpen(false)} 
          title={`${movie.title} - Official Trailer`}
        >
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MovieDetails;
