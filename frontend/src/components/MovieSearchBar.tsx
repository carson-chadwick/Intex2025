import { useState } from 'react';

interface MovieSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function MovieSearchBar({ onSearch }: MovieSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn rounded-0 btn-white-blackk">
        Search
      </button>
    </form>
  );
}

export default MovieSearchBar;
