import { useParams } from 'react-router-dom';
import Recommender from '../components/RecommenderComponent';

function MovieDetailPage() {
  const { showId } = useParams<{ showId: string }>();
  console.log('✅ showId:', showId); // ← add this line to test in dev tools
  return (
    <div className="container mt-5">
      <h2 className="text-3xl font-bold mb-3">Movie Details</h2>
      <p>
        You're viewing the details for movie ID: <strong>{showId}</strong>
      </p>

      {/* Recommendation Sections */}
      {showId && (
        <>
          <Recommender
            type="collab"
            showId={showId}
            Name="Because You Watched This..."
          />

          <Recommender
            type="content"
            showId={showId}
            Name="You Might Also Like"
          />
        </>
      )}
    </div>
  );
}

export default MovieDetailPage;
