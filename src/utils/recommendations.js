/**
 * Smart recommendation engine to rank similar movies based on:
 * 1. Genre overlap
 * 2. Rating similarity
 * 3. Release year proximity
 */
export const rankRecommendations = (baseMovie, candidates) => {
  if (!baseMovie || !candidates) return [];

  const baseGenres = baseMovie.genres?.map(g => g.id) || [];
  const baseYear = new Date(baseMovie.release_date).getFullYear();

  return candidates
    .map(movie => {
      let score = 0;

      // 1. Genre Overlap (High weight)
      const movieGenres = movie.genre_ids || [];
      const commonGenres = movieGenres.filter(id => baseGenres.includes(id));
      score += commonGenres.length * 20;

      // 2. Rating Similarity (Medium weight)
      const ratingDiff = Math.abs(baseMovie.vote_average - movie.vote_average);
      score += Math.max(0, 30 - ratingDiff * 5);

      // 3. Recency / Year Proximity (Low weight)
      const movieYear = new Date(movie.release_date).getFullYear();
      const yearDiff = Math.abs(baseYear - movieYear);
      score += Math.max(0, 15 - yearDiff);

      // 4. Popularity bonus
      score += movie.vote_count / 1000;

      return { ...movie, smartScore: score };
    })
    .sort((a, b) => b.smartScore - a.smartScore);
};
