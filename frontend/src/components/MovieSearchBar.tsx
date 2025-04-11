import { useState } from 'react';
import Cookies from 'js-cookie';

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
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder={t.placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn rounded-0 btn-white-blackk">
        {t.button}
      </button>
    </form>
  );
}

export default MovieSearchBar;
