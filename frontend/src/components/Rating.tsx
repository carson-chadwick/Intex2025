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

export default function HoverRating({
  showId,
  userId,
}: {
  showId: string;
  userId: number;
}) {
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);
  const [hasRated, setHasRated] = React.useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch user's existing rating on load
  React.useEffect(() => {
    fetch(`${apiUrl}/Movie/user/${userId}/${showId}`)
      .then((res) => {
        if (res.status === 404) return null; // No rating yet
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.rating !== undefined) {
          if (data.rating === null) {
            setValue(null); // ✨ Ensure this is null
            setHasRated(false); // ✨ User hasn't rated yet
          } else {
            setValue(data.rating); // ✨ User has rated
            setHasRated(true);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch user rating:', err);
      });
  }, [showId, userId]);

  // Handle rating change
  const handleRatingChange = (_event: any, newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);

      fetch(`${apiUrl}/Movie/SubmitOrUpdateRating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          showId: showId,
          rating: newValue,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to submit rating');
          setHasRated(true);
        })
        .catch((err) => {
          console.error('Error submitting rating:', err);
        });
    }
  };

  return (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <h5 className="montserrat-extrabold" style={{ marginBottom: 4 }}>
        {hasRated ? 'Your Rating' : 'Leave a Rating'}
      </h5>

      {/* Show read-only stars if rated */}
      {hasRated && value !== null && (
        <Rating
          name={`user-rating-${showId}`}
          value={value ?? 0}
          precision={1}
          getLabelText={getLabelText}
          onChange={handleRatingChange}
          onChangeActive={(_event, newHover) => setHover(newHover)}
          icon={
            <StarIcon
              style={{
                color: '#ffc107',
              }}
              fontSize="inherit"
            />
          }
          emptyIcon={
            <StarBorderIcon
              style={{
                color: '#FFD700',
                opacity: 0.3,
              }}
              fontSize="inherit"
            />
          }
          size="large"
        />
      )}
      {/* Show interactive stars if not rated yet */}
      {!hasRated && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            name={`user-rating-${showId}`}
            value={value ?? 0}
            precision={1}
            getLabelText={getLabelText}
            onChange={handleRatingChange}
            onChangeActive={(_event, newHover) => setHover(newHover)}
            icon={
              <StarIcon
                style={{
                  color: '#FFD700',
                }}
                fontSize="inherit"
              />
            }
            emptyIcon={
              <StarBorderIcon
                style={{
                  color: '#FFD700',
                  opacity: 0.3,
                }}
                fontSize="inherit"
              />
            }
            size="large"
          />
          {(hover !== -1 || value !== null) && (
            <Box className="montserrat-extrabold" sx={{ ml: 2, minWidth: 80 }}>
              {labels[hover !== -1 ? hover : (value ?? 0)]}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
