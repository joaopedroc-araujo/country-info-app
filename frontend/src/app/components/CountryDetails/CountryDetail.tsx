'use client';

import { useCountryDetails } from "@/app/hooks/useCountryDetails.hook";
import { JSX } from "react";
import { ErrorMessage } from "../ui/errorMessage";
import { LoadingSpinner } from "../ui/loading";
import { BorderCountries } from "./components/BorderCountries";
import { CountryHeader } from "./components/CountryHeader";
import { PopulationChart } from "./components/PopulationChart";

/**
 * CountryDetail component to display detailed information about a specific country.
 * @param {string} countryCode - The code of the country to display details for.
 * @returns {JSX.Element} The country detail component.
 */
export default function CountryDetail({
  countryCode,
}: {
  countryCode: string;
}): JSX.Element {
  const { countryData, loading, error } = useCountryDetails(countryCode);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!countryData) {
    return <div>No country data found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <CountryHeader name={countryData.name} flagUrl={countryData.flagUrl} />
        <BorderCountries borders={countryData.borders} />
        <PopulationChart population={countryData.population} />
      </div>
    </div>
  );
}