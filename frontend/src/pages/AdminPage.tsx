import { useEffect, useState } from 'react';
import { Movie } from '../types/Movies';
import Pagination from '../components/Pagination';
import { deleteMovie, fetchMovies } from '../api/IntexAPI';
import './AdminPage.css';
import MovieSearchBar from '../components/MovieSearchBar';
import Header from '../components/Header';
import AuthorizeView from '../components/AuthorizeView';
import Footer from '../components/Footer';
import MovieFormModal from '../components/MovieFormModal';
import { addMovie, editMovie } from '../api/IntexAPI';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeSortDropdown, setActiveSortDropdown] = useState<string | null>(
    null
  );
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchMovies(
          pageSize,
          pageNum,
          searchTerm,
          '',
          sortBy,
          sortOrder
        );
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, searchTerm, sortBy, sortOrder]);

  async (showId: number) => {
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
        <div className="apply-margin"></div>

        <div className="mt-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
              <button
                className="btn rounded-0 btn-white-black"
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
          </div>

          <MovieFormModal
            isOpen={showForm || !!editingMovie}
            onClose={() => {
              setShowForm(false);
              setEditingMovie(null);
            }}
            initialData={editingMovie}
            onSubmit={async (movieData) => {
              console.log('Submitting movie', movieData);
              try {
                if (editingMovie) {
                  await editMovie(
                    editingMovie.showId.toString(),
                    movieData as Movie
                  );
                } else {
                  await addMovie(movieData as Movie);
                }

                const data = await fetchMovies(
                  pageSize,
                  pageNum,
                  searchTerm,
                  '',
                  sortBy,
                  sortOrder
                );
                setMovies(data.movies);
              } catch (error) {
                alert('Something went wrong. Please try again.');
              } finally {
                setShowForm(false);
                setEditingMovie(null);
              }
            }}
          />

          <DeleteConfirmModal
            isOpen={!!movieToDelete}
            title={movieToDelete?.title || ''}
            onCancel={() => setMovieToDelete(null)}
            onConfirm={async () => {
              if (!movieToDelete) return;

              try {
                await deleteMovie(movieToDelete.showId.toString());
                setMovies(
                  movies.filter((m) => m.showId !== movieToDelete.showId)
                );
              } catch {
                alert('Failed to delete movie.');
              } finally {
                setMovieToDelete(null);
              }
            }}
          />

          <div className="container table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th className="sortable-header position-relative">
                    <div
                      onClick={() =>
                        setActiveSortDropdown((prev) =>
                          prev === 'title' ? null : 'title'
                        )
                      }
                    >
                      Title <span className="sort-arrow">⇅</span>
                    </div>
                    {activeSortDropdown === 'title' && (
                      <div
                        className="sort-dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => {
                            setSortBy('title');
                            setSortOrder('asc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Asc
                        </div>
                        <div
                          onClick={() => {
                            setSortBy('title');
                            setSortOrder('desc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Desc
                        </div>
                      </div>
                    )}
                  </th>

                  <th>Type</th>
                  <th className="sortable-header position-relative">
                    <div
                      onClick={() =>
                        setActiveSortDropdown((prev) =>
                          prev === 'director' ? null : 'director'
                        )
                      }
                    >
                      Director <span className="sort-arrow">⇅</span>
                    </div>
                    {activeSortDropdown === 'director' && (
                      <div
                        className="sort-dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => {
                            setSortBy('director');
                            setSortOrder('asc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Asc
                        </div>
                        <div
                          onClick={() => {
                            setSortBy('director');
                            setSortOrder('desc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Desc
                        </div>
                      </div>
                    )}
                  </th>

                  <th>Cast</th>
                  <th>Country</th>
                  <th className="sortable-header position-relative">
                    <div
                      onClick={() =>
                        setActiveSortDropdown((prev) =>
                          prev === 'releaseYear' ? null : 'releaseYear'
                        )
                      }
                    >
                      Release Year <span className="sort-arrow">⇅</span>
                    </div>
                    {activeSortDropdown === 'releaseYear' && (
                      <div
                        className="sort-dropdown"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          onClick={() => {
                            setSortBy('releaseYear');
                            setSortOrder('asc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Asc
                        </div>
                        <div
                          onClick={() => {
                            setSortBy('releaseYear');
                            setSortOrder('desc');
                            setActiveSortDropdown(null);
                          }}
                        >
                          Desc
                        </div>
                      </div>
                    )}
                  </th>

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
                        className="btn rounded-0 btn-sm w-100 mb-1 btn-black-white"
                        onClick={() => setEditingMovie(movie)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn rounded-0 btn-sm w-100 btn-red"
                        onClick={() => setMovieToDelete(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
        </div>

        <Footer />
      </AuthorizeView>
    </>
  );
}

export default AdminPage;
