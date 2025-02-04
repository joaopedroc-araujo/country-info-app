export const API_ENDPOINTS = {
  COUNTRIES: "countries/available",
  COUNTRY_DETAILS: (countryCode: string) => `countries/${countryCode}/info`,
};