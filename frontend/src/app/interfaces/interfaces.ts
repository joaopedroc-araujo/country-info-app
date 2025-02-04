export interface Country {
  name: string;
  countryCode: string;
}

export interface UseCountriesReturn {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

export interface BorderCountry {
  commonName: string;
  countryCode: string;
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface CountryDetail {
  name: string;
  flagUrl: string;
  borders: BorderCountry[];
  population: PopulationData[];
}

export interface UseCountryDetailsReturn {
  countryData: CountryDetail | null;
  loading: boolean;
  error: string | null;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}
