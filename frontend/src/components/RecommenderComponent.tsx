import RecommendCard from './RecommendCard';

interface RecommenderProps {
  user_id: number | null;
  show_id: string | null;
  Name: string;
}

const Recommender = ({ user_id, Name }: RecommenderProps) => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl font-semibold text-start">{Name}</h1>

      <div className="row mt-4 g-3 bg-transparent">
        {user_id === null && (
          <div className="col-auto">
            <RecommendCard
              imageSrc="https://mlworkspace6342542406.blob.core.windows.net/inteximages/Zozo.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Movie"
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
        )}
      </div>

      <div className="row mt-4 g-3 bg-transparent">
        {show_id === null && (
          <div className="col-auto">
            <RecommendCard
              imageSrc="https://mlworkspace6342542406.blob.core.windows.net/inteximages/Zozo.jpg"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Movie"
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
        )}
      </div>
    </div>
  );
};

export default Recommender;
