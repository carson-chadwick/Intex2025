import { useState } from 'react';
import Cookies from 'js-cookie';
import '../App.css';

interface MovieSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// ✅ Translation strings
const translations = {
  en: {
    placeholder: 'Search by title...',
    button: 'Search',
  },
  es: {
    placeholder: 'Buscar por título...',
    button: 'Buscar',
  },
};

function MovieSearchBar({ onSearch }: MovieSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const lang = Cookies.get('language') === 'es' ? 'es' : 'en';
  const t = translations[lang];

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
          placeholder={t.placeholder}
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
          {t.button}
        </button>
      </div>
    </form>
  );
}

export default MovieSearchBar;
