import { useState, useEffect } from "react";
import { fetchCountryDetails } from "../service/api.service";

interface CountryDetail {
  name: string;
  flag: string;
  borderCountries: Array<{
    name: string;
    code: string;
  }>;
  populationData: Array<{
    year: number;
    population: number;
  }>;
}

interface UseCountryDetailsReturn {
  countryData: CountryDetail | null;
  loading: boolean;
  error: string | null;
}

export function useCountryDetails(
  countryCode: string
): UseCountryDetailsReturn {
  const [countryData, setCountryData] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(countryCode);

  useEffect(() => {
    const getCountryData = async () => {
      if (!countryCode) return;

      try {
        setLoading(true);
        const data = await fetchCountryDetails(countryCode);
        console.log(data);

        const formattedData: CountryDetail = {
          name: data.name || "Unknown",
          flag: data.flagUrl || "",
          borderCountries:
            data.borders?.map((border: any) => ({
              name: border.name,
              code: border.code,
            })) || [],
          populationData:
            data.population?.map((pop: any) => ({
              year: pop.year,
              population: pop.population,
            })) || [],
        };

        setCountryData(formattedData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [countryCode]);

  return { countryData, loading, error };
}
