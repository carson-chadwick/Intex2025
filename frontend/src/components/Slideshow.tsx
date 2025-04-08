// Slideshow.tsx
import React, { useEffect } from 'react';

declare global {
  interface Window {
    initSlideshow: () => void;
  }
}

const Slideshow: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/slideshow.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.initSlideshow) {
        window.initSlideshow(); // Run the slideshow after it's loaded
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="slideshow-container" style={{ height: '100vh', width: '100vw' }}>
      {/* The slideshow script creates DOM inside body so no inner content needed */}
    </div>
  );
};

export default Slideshow;
