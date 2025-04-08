import { useEffect, useState } from 'react';
import RecommendCard from './RecommendCard';

interface RecData {
  title: string;
  genre?: string;
  rank: number;
}

interface RecommenderProps {
  Name: string;
  userId?: number;
  showId?: string;
  type: 'collab' | 'content' | 'homeTop' | 'homeGenre';
}

const Recommender = ({ Name, userId, showId, type }: RecommenderProps) => {
  const [recs, setRecs] = useState<RecData[]>([]);

  useEffect(() => {
    let endpoint = '';

    if (type === 'collab') endpoint = `/recommend/collab/${showId}`;
    if (type === 'content') endpoint = `/recommend/content/${showId}`;
    if (type === 'homeTop') endpoint = `/recommend/home/top/${userId}`;
    if (type === 'homeGenre') endpoint = `/recommend/home/genre/${userId}`;

    const BASE_URL = 'https://localhost:5000'; // or use process.env.REACT_APP_API_URL
    const fullUrl = `${BASE_URL}${endpoint}`;

    fetch(fullUrl)
      .then((res) => res.json())
      .then((data) => setRecs(data))
      .catch((err) => console.error('Failed to fetch recommendations:', err));
  }, [type, showId, userId]);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl font-semibold text-start mb-4">{Name}</h1>

      <div className="row g-3 bg-transparent">
        {recs.map((rec, idx) => (
          <div className="col-auto" key={idx}>
            <RecommendCard
              imageSrc={`/images/${rec.title}.jpg`} // 🔄 Update to your actual image path logic
              altText={rec.title}
              captionText={
                type === 'homeGenre' ? `${rec.genre}: ${rec.title}` : rec.title
              }
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
        ))}
      </div>
    </div>
  );
};

export default Recommender;
