import React, { useState, useEffect } from 'react';

const ProgressiveImage = ({ lowResolutionSrc, highResolutionSrc, alt, className}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = highResolutionSrc;
    img.onload = () => {
      setImageLoaded(true);
    };
    return ()=>{
      setImageLoaded(false);
    }
  }, [lowResolutionSrc, highResolutionSrc]);

  console.log(imageLoaded ? highResolutionSrc : lowResolutionSrc)

  return (
      <img className={className} loading='lazy'
        src={imageLoaded ? highResolutionSrc : lowResolutionSrc}
      />
  );
};

export default ProgressiveImage;