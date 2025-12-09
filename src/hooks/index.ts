import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useConfigStore } from '@/store';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
};

export const useInitializeApp = () => {
  const { initializeConfig } = useConfigStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeConfig();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initApp();
  }, [initializeConfig]);
};

export const useScrollPosition = (threshold: number = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};

export const useOnScreen = (options: IntersectionObserverInit = {}) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isVisible] as const;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};