import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode } from 'react';
import './RecommendCard.css';
import { useNavigate } from 'react-router-dom';

type TiltedCardProps = {
  showId: string;
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
};

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  showId = '',
  imageSrc = 'https://via.placeholder.com/300',
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '200px',
  imageHeight = '300px',
  imageWidth = '200px',
  scaleOnHover = 1.1,
  rotateAmplitude = 0,
  showMobileWarning = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0); // used for both title and dark overlay
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1); // show title & overlay
  }

  function handleMouseLeave() {
    opacity.set(0); // hide title & overlay
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const navigate = useNavigate();
  const handleNavigation = (path: string, id: string) => {
    navigate(`${path}/${id}`);
  };

  return (
    <figure
      onClick={() => handleNavigation('/MovieDetailPage', showId)}
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <div
        className="tilted-card-content"
        style={{ position: 'relative', overflow: 'visible' }}
      >
        <motion.div
          className="tilted-card-inner"
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX,
            rotateY,
            scale,
          }}
        >
          <img
            src={imageSrc}
            alt={altText}
            loading="lazy"
            className="tilted-card-img fade-in"
            style={{
              width: imageWidth,
              height: imageHeight,
              borderRadius: '6px',
            }}
            onError={(e) => {
              const placeholder =
                'https://mlworkspace6342542406.blob.core.windows.net/inteximages/NoImage.png';
              if (e.currentTarget.src !== placeholder) {
                e.currentTarget.src = placeholder;
              }
            }}
          />

          {/* ✨ Dark overlay on hover */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: imageWidth,
              height: imageHeight,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              opacity,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Optional content overlay */}
          {displayOverlayContent && overlayContent && (
            <motion.div className="tilted-card-overlay">
              {overlayContent}
            </motion.div>
          )}

          {/* ✨ Title on hover */}
          <motion.div
            className="tilted-card-overlay-title"
            style={{
              position: 'absolute',
              top: 70,
              width: '100%',
              textAlign: 'center',
              color: 'white',
              padding: '8px 0',
              fontSize: '30px',
              fontWeight: 'bold',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)',
              zIndex: 3,
              willChange: 'opacity',
              opacity,
            }}
          >
            {captionText}
          </motion.div>
        </motion.div>
      </div>
    </figure>
  );
}
