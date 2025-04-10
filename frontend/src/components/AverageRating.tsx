import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const labels: { [index: number]: string } = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function AverageRating({ showId }: { showId: string }) {
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
          <strong>Average Rating:</strong>
        </h6>
        <Rating
          name={`average-rating-${showId}`}
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          emptyIcon={
            <StarBorderIcon
              style={{
                color: '#ffc107', // same color
                opacity: 0.3,
              }}
              fontSize="inherit"
            />
          }
          size="small"
          readOnly
        />
      </Box>
      {/* Optional: Show numeric value and count below */}
      {/* {value !== null && (
      <Box sx={{ mt: 1 }}>
        <strong>{value}</strong> out of 5 ({ratingsCount} rating
        {ratingsCount !== 1 && 's'})
      </Box>
    )} */}
    </Box>
  );
}
