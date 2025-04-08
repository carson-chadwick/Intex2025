import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode } from 'react';
import './RecommendCard.css'; // or TiltedCard.css
import { useNavigate } from 'react-router-dom';

// ✅ Define your props type right after the imports
type TiltedCardProps = {
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
  imageSrc = 'https://via.placeholder.com/300',
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '200px',
  scaleOnHover = 1.1,
  rotateAmplitude = 0,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
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
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }


  //routing stuff
    const navigate = useNavigate();
    // const handleNavigation = (path: string, id: string) => {
    //   navigate(`${path}/${id}`);
    // };
    
    const handleNavigation = (path: string) => {
      navigate(path);
    };
  

  return (
    <>
      <figure
        // onClick={() => handleNavigation('/MovieDetailPage', '12345')} // Replace '12345' with actual ID
        onClick={() => handleNavigation('/MovieDetailPage')}
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

        <div className="tilted-card-content">
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
            <motion.img
              src={imageSrc}
              alt={altText}
              className="tilted-card-img"
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
            />

            {displayOverlayContent && overlayContent && (
              <motion.div className="tilted-card-overlay">
                {overlayContent}
              </motion.div>
            )}
          </motion.div>

          {showTooltip && (
            <motion.figcaption
              className="tilted-card-caption"
              style={{
                x,
                y,
                opacity,
                rotate: rotateFigcaption,
              }}
            >
              {captionText}
            </motion.figcaption>
          )}
          <p className="tilted-card-title">{captionText}</p>
        </div>
      </figure>
    </>
  );
}
