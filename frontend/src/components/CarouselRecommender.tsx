import { useEffect, useState, useRef } from 'react';
import ItemsCarousel from 'react-items-carousel';
import RecommendCard from './RecommendCard';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';


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
  autoScroll?: boolean;
  leftChevron?: React.ReactNode;
  rightChevron?: React.ReactNode;
}

const CarouselRecommender = ({
  Name,
  userId,
  showId,
  type,
  autoScroll = true,
  leftChevron,
  rightChevron,
}: CarouselRecommenderProps) => {
  const [recs, setRecs] = useState<RecData[]>([]);
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    {}
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [cardsToShow, setCardsToShow] = useState(6);
  const [hoveredGenres, setHoveredGenres] = useState<Record<string, boolean>>(
    {}
  );

  const updateCardCount = () => {
    const containerWidth = window.innerWidth * 0.8;
    const cardWidthWithSpacing = 200;
    const maxCards = Math.floor(containerWidth / cardWidthWithSpacing);
    setCardsToShow(Math.max(1, maxCards));
  };

  useEffect(() => {
    updateCardCount();
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
    if (!autoScroll || recs.length <= cardsToShow) return;
    intervalRef.current = setInterval(() => {
      setActiveIndexes((prev) => ({
        ...prev,
        default:
          (prev.default || 0) + 1 < recs.length - cardsToShow + 1
            ? (prev.default || 0) + 1
            : 0,
      }));
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recs, cardsToShow, autoScroll]);

  const sanitizeTitle = (title: string): string =>
    title?.replace(/[^a-zA-Z0-9\s]/g, '').trim() ?? 'Untitled';

  const renderCarousel = (items: RecData[], genreKey: string = 'default') => {
    const isHovered = hoveredGenres[genreKey] || false;

    return (
      <div
        className="relative"
        onMouseEnter={() =>
          setHoveredGenres((prev) => ({ ...prev, [genreKey]: true }))
        }
        onMouseLeave={() =>
          setHoveredGenres((prev) => ({ ...prev, [genreKey]: false }))
        }
      >
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
          requestToChangeActive={(index: number) =>
            setActiveIndexes((prev) => ({ ...prev, [genreKey]: index }))
          }
          activeItemIndex={activeIndexes[genreKey] || 0}
          chevronWidth={50}
          outsideChevron={false}
          infiniteLoop={true}
          leftChevron={
            leftChevron !== undefined ? (
              leftChevron
            ) : (
              <button
                className={`transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } bg-black text-white text-xl px-3 py-1 rounded hover:bg-gray-800`}
              >
                <FaChevronLeft />
              </button>
            )
          }
          rightChevron={
            rightChevron !== undefined ? (
              rightChevron
            ) : (
              <button
                className={`transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } bg-black text-white text-xl px-3 py-1 rounded hover:bg-gray-800`}
              >
                <FaChevronRight />
              </button>
            )
          }
        >
          {items.map((rec, idx) => {
            const sanitizedTitle = sanitizeTitle(rec.title);
            const imageSrc = `https://mlworkspace6342542406.blob.core.windows.net/inteximages/${sanitizedTitle}.jpg`;

            return (
              <div key={idx} style={{ width: '200px' }}>
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
    );
  };

  return (
    <div className="w-[80%] mx-auto my-12">
      {type !== 'homeGenre' && (
        <div className="px-4 sm:px-8 md:px-12 mb-10">
          <h2 className="montserrat-extrabold text-3xl text-start mb-6 text-white">
            {Name}
          </h2>
        </div>
      )}

      {type === 'homeGenre' ? (
        Object.entries(
          recs.reduce(
            (acc, rec) => {
              let genre = rec.genre || 'Other';
              if (genre === 'Action') genre = 'Adventure / Action';
              if (genre === 'Adventure') return acc;
              if (!acc[genre]) acc[genre] = [];
              acc[genre].push(rec);
              return acc;
            },
            {} as Record<string, RecData[]>
          )
        ).map(([genre, genreRecs]) => (
          <div key={genre} className="py-20">
            <div className="px-4 sm:px-8 md:px-12 mb-6">
              <h2 className="montserrat-extrabold text-3xl text-start text-white mt-3">
                Top picks in {genre}
              </h2>
            </div>
            <div className="carousel-container px-4 sm:px-8 md:px-12">
              {renderCarousel(genreRecs, genre)}
            </div>
          </div>
        ))
      ) : (
        <div className="carousel-container">
          {renderCarousel(recs, 'default')}
        </div>
      )}
    </div>
  );
};

export default CarouselRecommender;
