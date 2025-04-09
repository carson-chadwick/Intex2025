import { Movie } from '../types/Movies';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch movies (with optional genre & sorting)
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  searchTerm: string = '',
  genre: string = 'All',
  sortBy: string = '',
  order: 'asc' | 'desc' = 'asc'
): Promise<FetchMoviesResponse> => {
  try {
    const query = new URLSearchParams({
      pageSize: pageSize.toString(),
      pageNum: pageNum.toString(),
    });

    if (searchTerm.trim()) {
      query.append('search', searchTerm.trim());
    }

    if (genre && genre !== 'All') {
      query.append('genre', genre);
    }

    if (sortBy) {
      query.append('sortBy', sortBy);
    }

    if (order) {
      query.append('order', order);
    }

    const response = await fetch(
      `${API_URL}/Movie/AllMovies?${query.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};


// ✅ Delete movie
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movie/DeleteMovie/${showId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// ✅ Add a movie
export const addMovie = async (movie: Movie): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movie/AddMovie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// ✅ Edit movie
export const editMovie = async (
  showId: string,
  movie: Movie
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movie/EditMovie/${showId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error('Failed to update movie');
    }
  } catch (error) {
    console.error('Error editing movie:', error);
    throw error;
  }
};

export const fetchGenres = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/Movie/Genres`);
  if (!response.ok) throw new Error('Failed to fetch genres');
  return response.json();
};
