import httpClient from "@/config/httpClient";
import { CountryDetail } from "../hooks/useCountryDetails.hook";

export const fetchCountries = async () => {
  const response = await httpClient.get("countries/available");
  
  return response.data;
};

export const fetchCountryDetails = async (countryCode: string): Promise<CountryDetail> => {
  const response = await httpClient.get<CountryDetail>(`countries/${countryCode}/info`);

  return response.data;
};

