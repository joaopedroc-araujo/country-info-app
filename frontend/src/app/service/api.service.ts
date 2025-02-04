import httpClient from "@/config/httpClient";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { Country, CountryDetail } from "../interfaces/interfaces";

/**
 * Fetches the list of countries from the API.
 *
 * @returns {Promise<Country[]>} A promise that resolves to the data containing the list of countries.
 * @throws {Error} If the HTTP request fails.
 */
export const fetchCountries = async (): Promise<Country[]> => {
  const response = await httpClient.get(API_ENDPOINTS.COUNTRIES);
  
  return response.data;
};

/**
 * Fetches the details of a country based on the provided country code.
 *
 * @param {string} countryCode - The code of the country to fetch details for.
 * @returns {Promise<CountryDetail>} A promise that resolves to the details of the country.
 */
export const fetchCountryDetails = async (countryCode: string): Promise<CountryDetail> => {
  const response = await httpClient.get<CountryDetail>(API_ENDPOINTS.COUNTRY_DETAILS(countryCode));

  return response.data;
};

