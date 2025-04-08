import { useState } from 'react';
import { Movie } from '../types/Movies';
import { editMovie } from '../api/IntexAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editMovie(formData.showId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div className="form-grid">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            value={formData.director || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Cast:
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Movie</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
