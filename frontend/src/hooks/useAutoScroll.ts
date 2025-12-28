import { useEffect, useRef} from 'react';
import type {RefObject} from "react";

export const useAutoScroll = (dependency: any): RefObject<HTMLDivElement | null> => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [dependency]);

  return scrollRef;
};