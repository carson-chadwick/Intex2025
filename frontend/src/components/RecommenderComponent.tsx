import { useEffect, useState } from 'react';
import RecommendCard from './RecommendCard';

interface RecData {
  title: string;
  showId: string;
  genre?: string;
  rank: number;
  user_Id?: number;
}

interface RecommenderProps {
  Name: string;
  userId?: number;
  showId?: string;
  type:
    | 'collab'
    | 'content'
    | 'homeTop'
    | 'homeGenre'
    | 'topHits'
    | 'editorsPicks'
    | 'recentlyAdded';
}

const Recommender = ({ Name, userId, showId, type }: RecommenderProps) => {
  const [recs, setRecs] = useState<RecData[]>([]);

  const sanitizeTitle = (title: string): string => {
    return title?.replace(/[^a-zA-Z0-9\s]/g, '').trim() ?? 'Untitled';
  };

  useEffect(() => {
    let endpoint = '';

    if (type === 'collab') endpoint = `/recommend/collab/${showId}`;
    if (type === 'content') endpoint = `/recommend/content/${showId}`;
    if (type === 'homeTop') endpoint = `/recommend/home/top/${userId}`;
    if (type === 'homeGenre') endpoint = `/recommend/home/genre/${userId}`;
    if (type === 'topHits') endpoint = '/recommend/landing/top-hits';
    if (type === 'editorsPicks') endpoint = '/recommend/landing/editors-picks';
    if (type === 'recentlyAdded') endpoint = '/recommend/landing/recently-added';

    const BASE_URL = import.meta.env.VITE_API_URL;
    const fullUrl = `${BASE_URL}${endpoint}`;

    fetch(fullUrl)
      .then((res) => res.json())
      .then((data) => setRecs(data))
      .catch((err) => console.error('Failed to fetch recommendations:', err));
  }, [type, showId, userId]);

  const isMovieDetailRecommender = type === 'collab' || type === 'content';

  const renderRecs = (recsToRender: RecData[]) => (
    <div className="row g-3 bg-transparent">
      {recsToRender.map((rec, idx) => {
        const sanitizedTitle = sanitizeTitle(rec.title);
        const imageSrc = `https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizedTitle}.jpg`;

        return (
          <div className="col-auto" key={idx}>
            <RecommendCard
              showId={rec.showId}
              imageSrc={imageSrc}
              altText={rec.title}
              captionText={rec.title}
              containerHeight="300px"
              containerWidth="200px"
              imageHeight="300px"
              imageWidth="200px"
              rotateAmplitude={0}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
              overlayContent={false}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-[90%] mx-auto mb-5">
      {(isMovieDetailRecommender || type !== 'homeGenre') && (
        <h2 className="text-3xl font-semibold text-start mb-4">{Name}</h2>
      )}

      {type === 'homeGenre' ? (
        Object.entries(
          recs.reduce((acc, rec) => {
            const genre = rec.genre || 'Other';
            if (!acc[genre]) acc[genre] = [];
            acc[genre].push(rec);
            return acc;
          }, {} as Record<string, RecData[]>)
        ).map(([genre, genreRecs]) => (
          <div key={genre} className="mb-8">
            <h2 className="text-3xl font-semibold text-start mb-4">
              Top picks in {genre}
            </h2>
            {renderRecs(genreRecs)}
          </div>
        ))
      ) : (
        renderRecs(recs)
      )}
    </div>
  );
};

export default Recommender;