import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recommender from '../components/RecommenderComponent';

function MovieDetailPage() {
  const { showId } = useParams<{ showId: string }>();
  const [movie, setMovie] = useState<any>(null); // use a better type if you have one
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;

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

  // 🔧 Helper function to sanitize titles
  const sanitizeTitle = (title: string): string => {
    return title.replace(/[':./-]/g, '');
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading movie details...</p>
      ) : movie ? (
        <>
          <div className="row mb-4">
            <div className="row mb-4">
              <div className="col-6">
                <h2 className="text-3xl font-bold mb-3">{movie.title}</h2>
              </div>
            </div>
            <div className="col-6">
              <img
                src={`https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizeTitle(movie.title)}.jpg`}
                alt={movie.title}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: '300px', width: '100%' }} // 👈 scales with container
              />
            </div>

            <div className="col-md-6 text-start">
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
              <p className="mb-3">
                <strong>Country:</strong> {movie.country}
              </p>

              <h4 className="text-lg font-semibold mb-2">Description:</h4>
              <p className="mb-4">{movie.description}</p>

              <h4 className="text-lg font-semibold mb-2">Cast:</h4>
              <p className="mb-0">{movie.cast}</p>
            </div>
          </div>
          <p>
            You're viewing the details for movie ID: <strong>{showId}</strong>
          </p>

          <Recommender
            type="collab"
            showId={showId}
            Name="Because You Watched This..."
          />
          <Recommender
            type="content"
            showId={showId}
            Name="You Might Also Like"
          />
        </>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
  );
}

export default MovieDetailPage;
