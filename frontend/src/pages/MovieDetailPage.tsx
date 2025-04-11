import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

import Rating from '../components/Rating';
import AverageRating from '../components/AverageRating';
import AuthorizeView from '../components/AuthorizeView';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CarouselRecommender from '../components/CarouselRecommender';

const translations = {
  en: {
    loading: 'Loading movie details...',
    play: 'Play',
    director: 'Director',
    releaseYear: 'Release Year',
    rating: 'Rating',
    duration: 'Duration',
    country: 'Country',
    description: 'Description',
    cast: 'Cast',
    genres: 'Genres',
    becauseWatched: 'Because You Watched This',
    mightLike: 'You Might Also Like',
  },
  es: {
    loading: 'Cargando detalles de la película...',
    play: 'Reproducir',
    director: 'Director',
    releaseYear: 'Año de lanzamiento',
    rating: 'Clasificación',
    duration: 'Duración',
    country: 'País',
    description: 'Descripción',
    cast: 'Elenco',
    genres: 'Géneros',
    becauseWatched: 'Porque viste esto',
    mightLike: 'También te puede gustar',
  },
};

function MovieDetailPage() {
  const { showId } = useParams<{ showId: string }>();
  const [userId, setUserId] = useState<number | null>(null);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

  const ratingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showId) {
      fetch(`${url}/movie/GetMoviesByShowId/${showId}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setMovie(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch movie details:', err);
          setLoading(false);
        });
    }
  }, [showId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const pingResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/pingauth`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!pingResponse.ok) throw new Error('Failed to fetch auth info');
        const pingData = await pingResponse.json();

        if (!pingData.email) throw new Error('Email not returned');

        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/user/by-email/${encodeURIComponent(
            pingData.email
          )}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!userResponse.ok) throw new Error('Failed to fetch user by email');
        const userData = await userResponse.json();
        setUserId(userData.user_id);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ratingRef.current &&
        !ratingRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShowRating(false);
      }
    };

    if (showRating) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showRating]);

  const sanitizeTitle = (title: string): string => {
    return title.replace(/[':./-]/g, '');
  };

  return (
    <>
      <AuthorizeView>
        <Header />
        <br />
        <br />
        {loading || !movie ? (
          <div className="container text-white text-center my-5">
            <h3>{t.loading}</h3>
          </div>
        ) : (
          <div className="container my-5 text-white">
            <div className="row g-4 align-items-start text-start">
              <div className="col-md-4">
                <img
                  src={`https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizeTitle(movie.title)}.jpg`}
                  alt={movie.title}
                  className="img-fluid rounded shadow"
                />
                <div className="mt-3 d-flex gap-2 align-items-center position-relative">
                  <button
                    className="btn bg-warning text-dark fw-bold w-100"
                    onClick={() => alert('Play movie coming soon!')}
                  >
                    ▶ {t.play}
                  </button>
                  <button
                    ref={buttonRef}
                    className="btn bg-warning text-dark fw-bold px-2"
                    style={{ width: '12.5%' }}
                    onClick={() => setShowRating(!showRating)}
                  >
                    ★
                  </button>
                  {userId !== null && showRating && (
                    <motion.div
                      ref={ratingRef}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        scale: { type: 'spring', bounce: 0.5 },
                      }}
                      className="position-absolute top-0 start-100 translate-middle-y ms-2 bg-dark text-white rounded shadow p-3"
                      style={{ zIndex: 100, minWidth: '160px' }}
                    >
                      <Rating showId={showId!} userId={userId} />
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="col-md-8" style={{ maxWidth: '600px' }}>
                <h1 className="mb-3 montserrat-extrabold">{movie.title}</h1>
                <div className="mb-3 montserrat-regular">
                  <p className="mb-1">
                    <strong>{t.director}:</strong> {movie.director}
                  </p>
                  <p className="mb-1">
                    <strong>{t.releaseYear}:</strong> {movie.releaseYear}
                  </p>
                  <p className="mb-1">
                    <strong>{t.rating}:</strong> {movie.rating}
                  </p>
                  <p className="mb-1">
                    <strong>{t.duration}:</strong> {movie.duration}
                  </p>
                  <p className="mb-1">
                    <strong>{t.country}:</strong> {movie.country}
                  </p>
                  <div className="d-flex align-items-center mt-2">
                    <AverageRating showId={showId!} />
                  </div>
                </div>
                <div className="mb-4 montserrat-regular">
                  <h5 className="mb-2">{t.description}:</h5>
                  <p>{movie.description}</p>
                </div>
                <div className="mb-3 montserrat-regular">
                  <h5 className="mb-2">{t.cast}:</h5>
                  <p>
                    {movie.cast
                      ? movie.cast
                          .split(' ')
                          .reduce(
                            (acc: string[], curr: string, index: number) => {
                              const i = Math.floor(index / 2);
                              if (!acc[i]) acc[i] = curr;
                              else acc[i] += ' ' + curr;
                              return acc;
                            },
                            []
                          )
                          .join(', ')
                      : 'Unknown'}
                  </p>
                </div>
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-3">
                    <h5 className="mb-2 montserrat-regular">{t.genres}:</h5>
                    <div>
                      {movie.genres.map((genre: string, index: number) => (
                        <span
                          key={index}
                          className="badge bg-warning text-dark me-2 mb-1"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="my-5">
              <CarouselRecommender
                Name={t.becauseWatched}
                showId={showId}
                type="collab"
              />
            </div>
            <div className="my-5">
              <CarouselRecommender
                Name={t.mightLike}
                showId={showId}
                type="content"
              />
            </div>
          </div>
        )}
        <Footer />
      </AuthorizeView>
    </>
  );
}

export default MovieDetailPage;
