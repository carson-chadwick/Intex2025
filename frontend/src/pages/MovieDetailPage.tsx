import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Rating from '../components/Rating';
import AverageRating from '../components/AverageRating';
import AuthorizeView from '../components/AuthorizeView';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CarouselRecommender from '../components/CarouselRecommender';

function MovieDetailPage() {
  const { showId } = useParams<{ showId: string }>();
  const [userId, setUserId] = useState<number | null>(null);
  console.log('Current showId from URL:', showId);
  const [movie, setMovie] = useState<any>(null); // use a better type if you have one
  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const ratingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showId) {
      fetch(`${url}/movie/GetMoviesByShowId/${showId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
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

  // 🔧 Helper function to sanitize titles
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
            <h3>Loading movie details...</h3>
          </div>
        ) : (
          <div className="container my-5 text-white">
            <div className="row g-4 align-items-start text-start">
              {/* Poster */}
              <div className="col-md-4">
                <img
                  src={`https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizeTitle(movie.title)}.jpg`}
                  alt={movie.title}
                  className="img-fluid rounded shadow"
                  style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                />
                <div className="mt-3 d-flex gap-2 align-items-center position-relative">
                  {/* ▶ Play Button */}
                  <button
                    className="btn bg-warning text-dark fw-bold w-100"
                    onClick={() => alert('Play movie coming soon!')}
                  >
                    ▶ Play
                  </button>

                  {/* ★ Rate Button */}
                  <button
                    ref={buttonRef}
                    className="btn bg-warning text-dark fw-bold px-2"
                    style={{ width: '12.5%' }}
                    onClick={() => setShowRating(!showRating)}
                  >
                    ★
                  </button>

                  {/* Rating Popup */}
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

              {/* Info Section */}
              <div className="col-md-8" style={{ maxWidth: '600px' }}>
                <h1 className="mb-3 montserrat-extrabold">{movie.title}</h1>

                <div className="mb-3 montserrat-regular">
                  <p className="mb-1">
                    <strong>Director:</strong> {movie.director}
                  </p>
                  <p className="mb-1">
                    <strong>Release Year:</strong> {movie.releaseYear}
                  </p>
                  <p className="mb-1">
                    <strong>Rating:</strong> {movie.rating}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {movie.duration}
                  </p>
                  <p className="mb-1">
                    <strong>Country:</strong> {movie.country}
                  </p>
                  <div className="d-flex align-items-center mt-2">
                    <AverageRating showId={showId!} />
                  </div>
                </div>

                <div className="mb-4 montserrat-regular">
                  <h5 className="mb-2">Description:</h5>
                  <p>{movie.description}</p>
                </div>

                <div className="mb-3 montserrat-regular">
                  <h5 className="mb-2">Cast:</h5>
                  <p>
                    {movie.cast
                      .split(' ')
                      .reduce((acc: string[], curr: string, index: number) => {
                        const i = Math.floor(index / 2);
                        if (!acc[i]) acc[i] = curr;
                        else acc[i] += ' ' + curr;
                        return acc;
                      }, [])
                      .join(', ')}
                  </p>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                  <div className="mb-3">
                    <h5 className="mb-2 montserrat-regular">Genres:</h5>
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

            {/* Carousels */}
            <div className="my-5">
              <CarouselRecommender
                Name="Because You Watched This"
                showId={showId}
                type="collab"
              />
            </div>
            <div className="my-5">
              <CarouselRecommender
                Name="You Might Also Like"
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
