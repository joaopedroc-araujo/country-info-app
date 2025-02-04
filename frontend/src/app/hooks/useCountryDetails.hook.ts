'use client'

import { useState, useEffect } from "react";
import { fetchCountryDetails } from "../service/api.service";
import {
  BorderCountry,
  CountryDetail,
  PopulationData,
  UseCountryDetailsReturn,
} from "../interfaces/interfaces";

/**
 * Custom hook to fetch and manage the details of a specific country.
 * @param {string} countryCode - The code of the country to fetch details for.
 * @returns {UseCountryDetailsReturn} An object containing country data, loading state, and error.
 */
export function useCountryDetails(countryCode: string): UseCountryDetailsReturn {
  const [countryData, setCountryData] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getCountryData = async () => {
      if (!countryCode) return;

      try {
        setLoading(true);
        const data: CountryDetail = await fetchCountryDetails(countryCode);

        if (!data) {
          throw new Error("No data received");
        }

        const formattedData: CountryDetail = {
          name: data.name || "Unknown",
          flagUrl: data.flagUrl || "",
          borders: data.borders
            ? data.borders.map((border: BorderCountry) => ({
                commonName: border.commonName || "Unknown",
                countryCode: border.countryCode || "",
              }))
            : [],
          population: data.population
            ? data.population.map((pop: PopulationData) => ({
                year: pop.year || 0,
                value: pop.value || 0,
              }))
            : [],
        };

        setCountryData(formattedData);
        setError(null);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(error instanceof Error ? error.message : "An error occurred");
          setCountryData(null);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getCountryData();

    return () => {
      abortController.abort();
    };
  }, [countryCode]);

  return { countryData, loading, error };
}