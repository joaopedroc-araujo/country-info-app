import { useState, useEffect } from "react";
import { fetchCountryDetails } from "../service/api.service";

interface BorderCountry {
  commonName: string;
  countryCode: string;
}

interface PopulationData {
  year: number;
  value: number;
}
export interface CountryDetail {
  name: string;
  flagUrl: string;
  borders: BorderCountry[];
  population: PopulationData[];
}

interface UseCountryDetailsReturn {
  countryData: CountryDetail | null;
  loading: boolean;
  error: string | null;
}


export function useCountryDetails(countryCode: string): UseCountryDetailsReturn {
  const [countryData, setCountryData] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setError(error instanceof Error ? error.message : "An error occurred");
        setCountryData(null);
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [countryCode]);

  return { countryData, loading, error };
}
