import RecommendCard from './RecommendCard';

interface RecommenderProps {
  Id: number;
  Name: string;
}

const Recommender = ({ Id, Name }: RecommenderProps) => {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl font-semibold text-start">
        {Name}
      </h1>

      <div className="row mt-4 g-3 bg-transparent">
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
      </div>
    </div>
  );
};

export default Recommender;
