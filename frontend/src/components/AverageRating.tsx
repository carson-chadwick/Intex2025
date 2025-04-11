import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Cookies from 'js-cookie';

const labelMap: Record<string, Record<number, string>> = {
  en: {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  },
  es: {
    1: 'Inútil',
    2: 'Pobre',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente',
  },
};

const titleLabel: Record<string, string> = {
  en: 'Average Rating:',
  es: 'Calificación Promedio:',
};

function getLabelText(value: number, lang: 'en' | 'es') {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labelMap[lang][value]}`;
}

export default function AverageRating({ showId }: { showId: string }) {
  const lang: 'en' | 'es' = Cookies.get('language') === 'es' ? 'es' : 'en';

  const [value, setValue] = React.useState<number | null>(null);
  const [_ratingsCount, setRatingsCount] = React.useState<number>(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  React.useEffect(() => {
    fetch(`${apiUrl}/movie/GetAverageRating/${showId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setValue(data.averageRating);
        setRatingsCount(data.ratingsCount);
      })
      .catch((err) => {
        console.error('Failed to fetch average rating:', err);
      });
  }, [showId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 250,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <h6 style={{ marginBottom: 0, marginRight: 8 }}>
          <strong>{titleLabel[lang]}</strong>
        </h6>
        <Rating
          name={`average-rating-${showId}`}
          value={value}
          precision={0.5}
          getLabelText={(val) => getLabelText(val, lang)}
          emptyIcon={
            <StarBorderIcon
              style={{
                color: '#ffc107',
                opacity: 0.3,
              }}
              fontSize="inherit"
            />
          }
          size="small"
          readOnly
        />
      </Box>
    </Box>
  );
}
