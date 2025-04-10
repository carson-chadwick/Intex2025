import { useState } from 'react';
import '../App.css';

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
    <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <div
          style={{
            backgroundColor: 'white',
            height: '42px',
            width: '10px',
            borderTopLeftRadius: '0.5rem',
            borderBottomLeftRadius: '0.5rem',
            border: '1px solid #ccc',
            borderRight: 'none',
          }}
        ></div>
        <input
          type="text"
          className="form-control fw-semibold search-input"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            fontFamily: 'Montserrat',
            borderRadius: '0.5rem 0 0 0.5rem !important' as any,
            height: '42px',
            padding: '0.4rem 1rem',
            borderRight: 'none',
          }}
        />
        <button
          type="submit"
          className="fw-bold"
          style={{
            fontFamily: 'Montserrat',
            borderRadius: '0 0.5rem 0.5rem 0',
            height: '42px',
            padding: '0 1.25rem',
            lineHeight: '1.5',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            borderLeft: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default MovieSearchBar;
