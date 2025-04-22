import React, { useState } from 'react';
import { Spin } from 'antd';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, fallback, className = '', ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
};

export default Image; 