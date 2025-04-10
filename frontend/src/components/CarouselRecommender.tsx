import { useEffect, useState, useRef } from 'react';
import ItemsCarousel from 'react-items-carousel';
import RecommendCard from './RecommendCard';

interface RecData {
  title: string;
  showId: string;
  genre?: string;
  rank: number;
  user_Id?: number;
}

interface CarouselRecommenderProps {
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

const CarouselRecommender = ({
  Name,
  userId,
  showId,
  type,
}: CarouselRecommenderProps) => {
  const [recs, setRecs] = useState<RecData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [cardsToShow, setCardsToShow] = useState(6); // 👈 Start with default

  // ✅ Adjust number of cards based on screen width
  const updateCardCount = () => {
    const width = window.innerWidth;
    if (width >= 1600) setCardsToShow(8);
    else if (width >= 1475) setCardsToShow(7);
    else if (width >= 1290) setCardsToShow(6);
    else if (width >= 1100) setCardsToShow(5);
    else if (width >= 900) setCardsToShow(4);
    else if (width >= 700) setCardsToShow(3);
    else if (width >= 0) setCardsToShow(2);
    else setCardsToShow(1);
  };

  useEffect(() => {
    updateCardCount(); // Initial set
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

  useEffect(() => {
    let endpoint = '';

    if (type === 'collab') endpoint = `/recommend/collab/${showId}`;
    if (type === 'content') endpoint = `/recommend/content/${showId}`;
    if (type === 'homeTop') endpoint = `/recommend/home/top/${userId}`;
    if (type === 'homeGenre') endpoint = `/recommend/home/genre/${userId}`;
    if (type === 'topHits') endpoint = '/recommend/landing/top-hits';
    if (type === 'editorsPicks') endpoint = '/recommend/landing/editors-picks';
    if (type === 'recentlyAdded')
      endpoint = '/recommend/landing/recently-added';

    const BASE_URL = import.meta.env.VITE_API_URL;
    const fullUrl = `${BASE_URL}${endpoint}`;

    fetch(fullUrl)
      .then((res) => res.json())
      .then((data) => setRecs(data))
      .catch((err) =>
        console.error('Failed to fetch carousel recommendations:', err)
      );
  }, [type, userId, showId]);

  useEffect(() => {
    if (recs.length <= cardsToShow) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex + 1 < recs.length - cardsToShow + 1 ? prevIndex + 1 : 0
      );
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recs, cardsToShow]);

  const sanitizeTitle = (title: string): string =>
    title?.replace(/[^a-zA-Z0-9\s]/g, '').trim() ?? 'Untitled';

  return (
    <div className="w-[80%] mx-auto my-12">
      <div className="px-4 sm:px-8 md:px-12">
        <h2 className="montserrat-extrabold text-3xl text-start mb-6 text-white">
          {Name}
        </h2>
      </div>

      <div className="carousel-container">
        <ItemsCarousel
          enablePlaceholder
          numberOfPlaceholderItems={3}
          minimumPlaceholderTime={500}
          placeholderItem={
            <div style={{ height: 300, background: '#202020' }} />
          }
          numberOfCards={cardsToShow}
          gutter={20}
          showSlither={true}
          firstAndLastGutter={true}
          freeScrolling={false}
          requestToChangeActive={setActiveIndex}
          activeItemIndex={activeIndex}
          activePosition={'center'}
          chevronWidth={50}
          outsideChevron={false}
          infiniteLoop={true}
          rightChevron={
            <button className="bg-black text-white text-xl px-3 py-1 rounded hover:bg-gray-800">
              {'>'}
            </button>
          }
          leftChevron={
            <button className="bg-black text-white text-xl px-3 py-1 rounded hover:bg-gray-800">
              {'<'}
            </button>
          }
        >
          {recs.map((rec, idx) => {
            const sanitizedTitle = sanitizeTitle(rec.title);
            const imageSrc = `https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizedTitle}.jpg`;

            return (
              <div key={idx} style={{ width: '200px', padding: '0 10px' }}>
                <RecommendCard
                  showId={rec.showId}
                  imageSrc={imageSrc}
                  altText={rec.title}
                  captionText={rec.title}
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
        </ItemsCarousel>
      </div>
    </div>
  );
};

export default CarouselRecommender;
