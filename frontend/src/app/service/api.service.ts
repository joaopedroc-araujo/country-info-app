import httpClient from "@/config/httpClient";

export const fetchCountries = async () => {
  const response = await httpClient.get("countries/available");
  return response;
};

export const fetchCountryDetails = async (countryCode: string) => {
  const response = await httpClient.get(`countries/${countryCode}/info`);
  console.log(response);
  return response;
};
