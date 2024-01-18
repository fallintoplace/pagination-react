// useFetchStartup.tsx
import { useState, useEffect } from 'react';
import { StartupHttpService } from '../../Http/Startup/Startup.http.service';
import { Startup } from '../../Types/Startup';

type UseFetchStartupsResult = {
  startups: Startup[];
  loading: boolean;
  error: string | null;
};

// Custom hook for fetching startups
export function useFetchStartups(): UseFetchStartupsResult {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      try {
        const data = await StartupHttpService.getStartups();
        setStartups(data);
      } catch (error) {
        setError('Failed to fetch startups. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  return { startups, loading, error };
}
