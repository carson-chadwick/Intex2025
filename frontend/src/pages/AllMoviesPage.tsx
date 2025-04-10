import { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../components/Header';
import RecommendCard from '../components/RecommendCard';
import MovieSearchBar from '../components/MovieSearchBar'; // ✅ import it

interface MovieData {
  title: string;
  genre?: string;
  showId: string;
}

function AllMoviesPage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [order, setOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genreFilter, setGenreFilter] = useState('');

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sanitizeTitle = (title: string): string => {
    return title
      .normalize('NFD')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '%20');
  };

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

      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      if (genreFilter) {
        queryParams.append('genre', genreFilter);
      }

      const fullUrl = `${BASE_URL}/Movie/AllMovies?${queryParams.toString()}`;

      try {
        const res = await fetch(fullUrl, {
          credentials: 'include',
        });
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

  // 🔁 Run when sort/search changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies(1, true); // reset = true
  }, [sortBy, order, searchTerm, genreFilter, fetchMovies]);

  // 🔁 Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchMovies(page);
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 1.0,
      }
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
        <div className="container mb-4">
          <div className="row gx-3">
            <div className="col-12 col-md-4">
              <MovieSearchBar onSearch={(term) => setSearchTerm(term)} />
            </div>
            <div className="col-6 col-md-3">
              <select
                className="form-select fw-semibold"
                style={{ fontFamily: 'Montserrat', height: '42px' }}
                value={`${sortBy}-${order}`}
                onChange={(e) => {
                  const [sort, ord] = e.target.value.split('-');
                  setSortBy(sort);
                  setOrder(ord);
                }}
              >
                <option value="default-default">Sort</option>
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
                <option value="releaseyear-asc">Release Year ↑</option>
                <option value="releaseyear-desc">Release Year ↓</option>
              </select>
            </div>
            <div className="col-6 col-md-5">
              <select
                className="form-select fw-semibold"
                style={{ fontFamily: 'Montserrat', height: '42px' }}
                value={genreFilter}
                onChange={(e) => {
                  setGenreFilter(e.target.value);
                  setMovies([]);
                  setPage(1);
                  setHasMore(true);
                }}
              >
                <option value="">All Genres</option>
                <option value="action">Action/Adventure</option>
                <option value="animeSeriesInternationalTvShows">
                  Anime Series / International TV Shows
                </option>
                <option value="britishTvShowsDocuseriesInternationalTvShows">
                  British / Docuseries / International TV Shows
                </option>
                <option value="children">Children</option>
                <option value="comedies">Comedies</option>
                <option value="comediesDramasInternationalMovies">
                  Comedies / Dramas / International Movies
                </option>
                <option value="comediesInternationalMovies">
                  Comedies / International Movies
                </option>
                <option value="comediesRomanticMovies">
                  Comedies / Romantic Movies
                </option>
                <option value="crimeTvShowsDocuseries">
                  Crime TV Shows / Docuseries
                </option>
                <option value="documentaries">Documentaries</option>
                <option value="documentariesInternationalMovies">
                  Documentaries / International Movies
                </option>
                <option value="docuseries">Docuseries</option>
                <option value="dramas">Dramas</option>
                <option value="dramasInternationalMovies">
                  Dramas / International Movies
                </option>
                <option value="dramasRomanticMovies">
                  Dramas / Romantic Movies
                </option>
                <option value="familyMovies">Family Movies</option>
                <option value="fantasy">Fantasy</option>
                <option value="horrorMovies">Horror Movies</option>
                <option value="internationalMoviesThrillers">
                  International Movies / Thrillers
                </option>
                <option value="internationalTvShowsRomanticTvShowsTvDramas">
                  International / Romantic TV Shows / TV Dramas
                </option>
                <option value="kidsTv">Kids' TV</option>
                <option value="languageTvShows">Language TV Shows</option>
                <option value="musicals">Musicals</option>
                <option value="natureTv">Nature TV</option>
                <option value="realityTv">Reality TV</option>
                <option value="spirituality">Spirituality</option>
                <option value="tvAction">TV Action</option>
                <option value="tvComedies">TV Comedies</option>
                <option value="tvDramas">TV Dramas</option>
                <option value="talkShowsTvComedies">
                  Talk Shows / TV Comedies
                </option>
                <option value="thrillers">Thrillers</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-3 bg-transparent align-items-center justify-content-center">
          {movies.map((movie, idx) => {
            const sanitizedTitle = sanitizeTitle(movie.title);
            const imageSrc = `https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizedTitle}.jpg`;

            return (
              <div className="col-auto p-3" key={`${movie.title}-${idx}`}>
                <RecommendCard
                  showId={movie.showId}
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
            No more movies to load.
          </p>
        )}
      </div>
    </>
  );
}

export default AllMoviesPage;
