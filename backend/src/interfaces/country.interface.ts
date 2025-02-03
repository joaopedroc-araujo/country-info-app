export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryInfoResponse {
  borders: string[];
  commonName: string;
}

export interface PopulationData {
  year: number;
  value: string;
}

export interface FlagResponse {
  flag: string;
}
