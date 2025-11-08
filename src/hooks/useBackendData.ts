import { useState, useEffect } from 'react';
import { getTestimonials, getBlogPosts, getCaseStudies, getPlatformStats } from '@/lib/api';

interface UseBackendDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch data from backend
 * Handles loading and error states
 */
export function useBackendData<T>(
  fetcher: () => Promise<{ success: boolean; data?: T; error?: string }>,
  dependencies: unknown[] = []
): UseBackendDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetcher();

        if (isMounted) {
          if (response.success && response.data) {
            setData(response.data);
          } else {
            setError(response.error || 'Failed to fetch data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

/**
 * Hook to fetch testimonials
 */
export function useTestimonials() {
  return useBackendData(() => getTestimonials(), []);
}

/**
 * Hook to fetch blog posts
 */
export function useBlogPosts(limit?: number) {
  return useBackendData(() => getBlogPosts(limit), [limit]);
}

/**
 * Hook to fetch case studies
 */
export function useCaseStudies() {
  return useBackendData(() => getCaseStudies(), []);
}

/**
 * Hook to fetch platform stats
 */
export function usePlatformStats() {
  return useBackendData(() => getPlatformStats(), []);
}