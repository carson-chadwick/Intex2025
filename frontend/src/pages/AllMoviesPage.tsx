import { useEffect, useState, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import RecommendCard from '../components/RecommendCard';
import MovieSearchBar from '../components/MovieSearchBar';

interface MovieData {
  title: string;
  genre?: string;
}

const translations = {
  en: {
    sort: 'Sort',
    titleAZ: 'Title A–Z',
    titleZA: 'Title Z–A',
    releaseAsc: 'Release Year ↑',
    releaseDesc: 'Release Year ↓',
    allGenres: 'All Genres',
    loadingMore: 'No more movies to load.',
  },
  es: {
    sort: 'Ordenar',
    titleAZ: 'Título A–Z',
    titleZA: 'Título Z–A',
    releaseAsc: 'Año de estreno ↑',
    releaseDesc: 'Año de estreno ↓',
    allGenres: 'Todos los géneros',
    loadingMore: 'No hay más películas para cargar.',
  },
};

const localizedGenres: Record<string, { en: string; es: string }> = {
  action: { en: 'Action/Adventure', es: 'Acción/Aventura' },
  comedies: { en: 'Comedies', es: 'Comedias' },
  dramas: { en: 'Dramas', es: 'Dramas' },
  documentaries: { en: 'Documentaries', es: 'Documentales' },
  horrorMovies: { en: 'Horror', es: 'Terror' },
  musicals: { en: 'Musicals', es: 'Musicales' },
  thrillers: { en: 'Thrillers', es: 'Suspenso' },
  tvDramas: { en: 'TV Dramas', es: 'Dramas de TV' },
  animeSeriesInternationalTvShows: {
    en: 'Anime / International TV',
    es: 'Anime / TV Internacional',
  },
  children: { en: 'Children', es: 'Infantil' },
  familyMovies: { en: 'Family Movies', es: 'Películas Familiares' },
  realityTv: { en: 'Reality TV', es: 'TV Realidad' },
  tvComedies: { en: 'TV Comedies', es: 'Comedias de TV' },
  spirituality: { en: 'Spirituality', es: 'Espiritualidad' },
  fantasy: { en: 'Fantasy', es: 'Fantasía' },
  crimeTvShowsDocuseries: {
    en: 'Crime TV Shows / Docuseries',
    es: 'Crimen / Docuseries',
  },
  talkShowsTvComedies: {
    en: 'Talk Shows / TV Comedies',
    es: 'Talk Shows / Comedias TV',
  },
};

function AllMoviesPage() {
  const [lang] = useState<'en' | 'es'>(() => {
    const cookieLang = Cookies.get('language');
    return cookieLang === 'es' ? 'es' : 'en';
  });
  const t = translations[lang];

  const [movies, setMovies] = useState<MovieData[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [order, setOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState('');
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sanitizeTitle = (title: string): string =>
    title
      .normalize('NFD')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '%20');

  const fetchMovies = useCallback(
    async (pageNum: number, reset = false) => {
      setLoading(true);
      const BASE_URL = import.meta.env.VITE_API_URL;
      const queryParams = new URLSearchParams({
        pageSize: '72',
        pageNum: pageNum.toString(),
      });

      if (sortBy !== 'default' && order !== 'default') {
        queryParams.append('sortBy', sortBy);
        queryParams.append('order', order);
      }

      if (searchTerm) queryParams.append('search', searchTerm);
      if (genreFilter) queryParams.append('genre', genreFilter);

      const fullUrl = `${BASE_URL}/Movie/AllMovies?${queryParams.toString()}`;

      try {
        const res = await fetch(fullUrl, { credentials: 'include' });
        const data = await res.json();

        if (data.movies && data.movies.length > 0) {
          setMovies((prev) =>
            reset ? data.movies : [...prev, ...data.movies]
          );
          setPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, order, searchTerm, genreFilter]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, true);
  }, [sortBy, order, searchTerm, genreFilter, fetchMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchMovies(page);
        }
      },
      { root: null, rootMargin: '200px', threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [loading, hasMore, page, fetchMovies]);

  return (
    <>
      <Header />
      <div className="apply-margin"></div>
      <div className="w-[90%] mx-auto mb-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <MovieSearchBar onSearch={(term) => setSearchTerm(term)} />

            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [sort, ord] = e.target.value.split('-');
                setSortBy(sort);
                setOrder(ord);
              }}
            >
              <option value="default-default">{t.sort}</option>
              <option value="title-asc">{t.titleAZ}</option>
              <option value="title-desc">{t.titleZA}</option>
              <option value="releaseyear-asc">{t.releaseAsc}</option>
              <option value="releaseyear-desc">{t.releaseDesc}</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={genreFilter}
              onChange={(e) => {
                setGenreFilter(e.target.value);
                setMovies([]);
                setPage(1);
                setHasMore(true);
              }}
            >
              <option value="">{t.allGenres}</option>
              {Object.entries(localizedGenres).map(([key, value]) => (
                <option key={key} value={key}>
                  {value[lang]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-3 bg-transparent">
          {movies.map((movie, idx) => {
            const sanitizedTitle = sanitizeTitle(movie.title);
            const imageSrc = `https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizedTitle}.jpg`;

            return (
              <div className="col-auto p-3" key={`${movie.title}-${idx}`}>
                <RecommendCard
                  showId={''}
                  imageSrc={imageSrc}
                  altText={movie.title}
                  captionText={movie.title}
                  containerHeight="300px"
                  containerWidth="200px"
                  imageHeight="300px"
                  imageWidth="200px"
                  rotateAmplitude={0}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                  overlayContent={false}
                />
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500" />
          </div>
        )}

        <div ref={loaderRef} className="h-10" />

        {!hasMore && !loading && (
          <p className="text-center text-gray-500 text-sm my-4">
            {t.loadingMore}
          </p>
        )}
      </div>
    </>
  );
}

export default AllMoviesPage;
