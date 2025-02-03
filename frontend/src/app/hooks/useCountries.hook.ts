import { useState, useEffect } from "react";
import { fetchCountries } from "../service/api.service";

interface Country {
  name: string;
  countryCode: string;
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
        if (Array.isArray(response)) {
          setCountries(response);
        } else {
          throw new Error("Expected an array of countries");
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
