import { useEffect, useState } from 'react'
import { Movie } from '../types/Movies';;
import Pagination from '../components/Pagination';
import { deleteMovie, fetchMovies } from '../api/IntexAPI';
import EditMovieForm from '../components/EditMovieForm';
import NewMovieForm from '../components/NewMovieForm';
import './AdminPage.css';
import MovieSearchBar from '../components/MovieSearchBar';
import Header from '../components/Header';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';


function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10); // Number of records per page
  const [pageNum, setPageNum] = useState<number>(1); // Current page number
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');


useEffect(() => {
  const loadProjects = async () => {
    try {
      const data = await fetchMovies(pageSize, pageNum, searchTerm);
      setMovies(data.movies);
      setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  loadProjects();
}, [pageSize, pageNum, searchTerm]);



  const handleDelete = async (showId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId.toString());
      setMovies(movies.filter((p) => Number(p.showId) !== showId));
    } catch (error) {
      alert('Failed to delete project. Please try again');
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <AuthorizeView>
        <Header />
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>
        <div className="container mt-5">
          {!showForm && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn rounded-0"
                onClick={() => setShowForm(true)}
              >
                Add Movie
              </button>
              <div className="w-50">
                <MovieSearchBar
                  onSearch={(term) => {
                    setSearchTerm(term);
                    setPageNum(1);
                  }}
                />
              </div>
            </div>
          )}

          {showForm && (
            <div className="row mb-4">
              <div className="col-12 col-md-10 offset-md-1">
                <NewMovieForm
                  onSuccess={() => {
                    setShowForm(false);
                    fetchMovies(pageSize, pageNum, searchTerm).then((data) =>
                      setMovies(data.movies)
                    );
                  }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          )}

          {editingMovie && (
            <div className="row mb-4">
              <div className="col-12 col-md-10 offset-md-1">
                <EditMovieForm
                  movie={editingMovie}
                  onSuccess={() => {
                    setEditingMovie(null);
                    fetchMovies(pageSize, pageNum, searchTerm).then((data) =>
                      setMovies(data.movies)
                    );
                  }}
                  onCancel={() => setEditingMovie(null)}
                />
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Director</th>
                  <th>Cast</th>
                  <th>Country</th>
                  <th>Release Year</th>
                  <th>Rating</th>
                  <th>Duration</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.showId}>
                    <td>{movie.title}</td>
                    <td>{movie.type}</td>
                    <td>{movie.director || 'N/A'}</td>
                    <td>{movie.cast}</td>
                    <td>{movie.country}</td>
                    <td>{movie.releaseYear}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.duration}</td>
                    <td>
                      {Object.entries(movie)
                        .filter(
                          ([_, value]) =>
                            typeof value === 'number' && value === 1
                        )
                        .map(([key]) =>
                          key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())
                        )
                        .join(', ')}
                    </td>
                    <td>
                      <button
                        className="btn rounded-0 btn-sm w-100 mb-1"
                        onClick={() => setEditingMovie(movie)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn rounded-0 btn-sm w-100"
                        onClick={() => handleDelete(Number(movie.showId))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
        </div>
      </AuthorizeView>
    </>
  );
}

export default AdminPage;
