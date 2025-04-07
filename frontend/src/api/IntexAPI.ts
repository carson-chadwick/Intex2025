import { Movie } from '../types/movies';

// Whatever API we are using goes here :)

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = '';

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  // selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  try {
    // const categoryParams = selectedCategories
      // .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      // .join('&');

    const response = await fetch(
      `${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};