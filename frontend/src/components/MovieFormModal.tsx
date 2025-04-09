import { useEffect, useState } from 'react';
import { Movie } from '../types/Movies';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movie: Partial<Movie>) => void;
  initialData?: Movie | null;
}

const MovieFormModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [formData, setFormData] = useState<Partial<Movie>>(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {initialData ? 'Edit Movie' : 'Add New Movie'}
        </h2>

        <div className="grid gap-3">
          <input
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Title"
            className="form-control"
          />
          <input
            name="type"
            value={formData.type || ''}
            onChange={handleChange}
            placeholder="Type"
            className="form-control"
          />
          <input
            name="director"
            value={formData.director || ''}
            onChange={handleChange}
            placeholder="Director"
            className="form-control"
          />
          <input
            name="cast"
            value={formData.cast || ''}
            onChange={handleChange}
            placeholder="Cast"
            className="form-control"
          />
          <input
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            placeholder="Country"
            className="form-control"
          />
          <input
            name="releaseYear"
            value={formData.releaseYear || ''}
            onChange={handleChange}
            placeholder="Release Year"
            className="form-control"
          />
          <input
            name="rating"
            value={formData.rating || ''}
            onChange={handleChange}
            placeholder="Rating"
            className="form-control"
          />
          <input
            name="duration"
            value={formData.duration || ''}
            onChange={handleChange}
            placeholder="Duration"
            className="form-control"
          />
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Description"
            className="form-control"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-dark">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFormModal;
