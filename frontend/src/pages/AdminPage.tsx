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
import Cookies from 'js-cookie';

// Translation support
const translations = {
  en: {
    addMovie: 'Add Movie',
    edit: 'Edit',
    delete: 'Delete',
    title: 'Title',
    type: 'Type',
    director: 'Director',
    cast: 'Cast',
    country: 'Country',
    releaseYear: 'Release Year',
    rating: 'Rating',
    duration: 'Duration',
    genre: 'Genre',
    actions: 'Actions',
    loading: 'Loading movies...',
    error: 'Error loading movies.',
  },
  es: {
    addMovie: 'Agregar Película',
    edit: 'Editar',
    delete: 'Eliminar',
    title: 'Título',
    type: 'Tipo',
    director: 'Director',
    cast: 'Reparto',
    country: 'País',
    releaseYear: 'Año de estreno',
    rating: 'Clasificación',
    duration: 'Duración',
    genre: 'Género',
    actions: 'Acciones',
    loading: 'Cargando películas...',
    error: 'Error al cargar películas.',
  },
};

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
  const [sortBy] = useState<string>('');
  const [sortOrder] = useState<'asc' | 'desc'>('asc');
  const [] = useState<string | null>(
    null
  );
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

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

  if (loading) return <p>{t.loading}</p>;
  if (error) return <p className="text-red-500">{t.error}</p>;

  return (
    <AuthorizeView>
      <Header />
      <div className="apply-margin" />
      <div className="mt-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <button
              className="btn btn-white-black"
              onClick={() => setShowForm(true)}
            >
              {t.addMovie}
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
                <th>{t.title}</th>
                <th>{t.type}</th>
                <th>{t.director}</th>
                <th>{t.cast}</th>
                <th>{t.country}</th>
                <th>{t.releaseYear}</th>
                <th>{t.rating}</th>
                <th>{t.duration}</th>
                <th>{t.genre}</th>
                <th>{t.actions}</th>
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
                        ([_, value]) => typeof value === 'number' && value === 1
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
                      className="btn btn-sm w-100 mb-1 btn-black-white"
                      onClick={() => setEditingMovie(movie)}
                    >
                      {t.edit}
                    </button>
                    <button
                      className="btn btn-sm w-100 mb-1 btn-black-white"
                      onClick={() => setMovieToDelete(movie)}
                    >
                      {t.delete}
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
  );
}

export default AdminPage;
