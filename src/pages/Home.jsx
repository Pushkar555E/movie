import React, { useState, useEffect } from 'react';
import { movieService } from '../services/tmdb';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { TrendingUp, Film, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';

const SectionHeader = ({ title, icon: Icon, link }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-zinc-800/50 rounded-lg text-primary">
        <Icon size={20} />
      </div>
      <h2 className="text-xl md:text-2xl font-outfit font-bold uppercase tracking-tight">{title}</h2>
    </div>
    {link && (
      <Link to={link} className="text-zinc-500 hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors">
        View All <ChevronRight size={16} />
      </Link>
    )}
  </div>
);

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useMovie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          movieService.getTrending(),
          movieService.getPopular(),
          movieService.getTopRated(),
        ]);
        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero movie={trending[0]} loading={loading} />

      <div className="container mx-auto px-4 md:px-12 lg:px-24 -mt-32 relative z-20 space-y-16 pb-20">
        {/* Recently Viewed / Continue Watching */}
        {recentlyViewed.length > 0 && (
          <section className="animate-fade-in">
            <SectionHeader title="Continue Watching" icon={Film} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recentlyViewed.slice(0, 6).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* Trending Section */}
        <section>
          <SectionHeader title="Trending Today" icon={TrendingUp} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in">
            {loading ? (
              [...Array(6)].map((_, i) => <div key={i} className="aspect-[2/3] skeleton" />)
            ) : (
              trending.slice(0, 12).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>

        {/* Popular Section */}
        <section>
          <SectionHeader title="Popular Movies" icon={Film} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => <div key={i} className="aspect-[2/3] skeleton" />)
            ) : (
              popular.slice(0, 6).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>

        {/* Top Rated Section */}
        <section>
          <SectionHeader title="Top Rated" icon={Award} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => <div key={i} className="aspect-[2/3] skeleton" />)
            ) : (
              topRated.slice(0, 6).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
