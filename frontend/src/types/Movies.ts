export interface Movie {
  showId: string;
  type: string;
  title: string;
  director: string | null;
  cast: string;
  country: string;
  releaseYear: number;
  rating: string;
  duration: string;
  description: string;

  // Genre flags
  action: number;
  adventure: number;
  animeSeriesInternationalTvShows: number;
  britishTvShowsDocuseriesInternationalTvShows: number;
  children: number;
  comedies: number;
  comediesDramasInternationalMovies: number;
  comediesInternationalMovies: number;
  comediesRomanticMovies: number;
  crimeTvShowsDocuseries: number;
  documentaries: number;
  documentariesInternationalMovies: number;
  docuseries: number;
  dramas: number;
  dramasInternationalMovies: number;
  dramasRomanticMovies: number;
  familyMovies: number;
  fantasy: number;
  horrorMovies: number;
  internationalMoviesThrillers: number;
  internationalTvShowsRomanticTvShowsTvDramas: number;
  kidsTv: number;
  languageTvShows: number;
  musicals: number;
  natureTv: number;
  realityTv: number;
  spirituality: number;
  tvAction: number;
  tvComedies: number;
  tvDramas: number;
  talkShowsTvComedies: number;
  thrillers: number;
}
