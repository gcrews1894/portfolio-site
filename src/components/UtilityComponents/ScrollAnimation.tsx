import React, { useEffect, useRef, useState } from 'react';
import { Box, BoxProps } from '@mui/material';

interface ScrollAnimationProps extends BoxProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  const getAnimationStyle = () => {
    const baseStyle = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}s ease-out ${delay}s`,
    };

    switch (animation) {
      case 'slideUp':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        };
      case 'slideLeft':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        };
      case 'slideRight':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box ref={ref} sx={getAnimationStyle()} {...props}>
      {children}
    </Box>
  );
}; 