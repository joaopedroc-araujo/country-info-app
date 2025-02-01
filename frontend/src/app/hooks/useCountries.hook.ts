// hooks/useCountries.ts
import { useState, useEffect } from "react";
import { fetchCountries } from "../service/api.service";

interface Country {
  name: string;
  code: string;
}

interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const response = await fetchCountries();
        if (response?.data) {
          setCountries(response.data);
        } else {
          throw new Error("No data received from API");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return { countries, loading, error };
}
