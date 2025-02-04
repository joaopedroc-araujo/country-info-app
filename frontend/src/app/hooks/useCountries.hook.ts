import { useState, useEffect } from "react";
import { fetchCountries } from "../service/api.service";
import { UseCountriesReturn, Country } from "../interfaces/interfaces";

/**
 * Custom hook to fetch and manage the list of countries.
 * @returns {UseCountriesReturn} An object containing countries, loading state, and error.
 */
export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

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
        if (!abortController.signal.aborted) {
          setError(error instanceof Error ? error.message : "An error occurred");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getCountries();

    return () => {
      abortController.abort();
    };
  }, []);

  return { countries, loading, error };
}