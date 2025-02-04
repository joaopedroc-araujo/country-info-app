"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { useCountries } from "../../hooks/useCountries.hook";
import { ErrorMessage } from "../ui/errorMessage";
import { LoadingSpinner } from "../ui/loading";
import { JSX } from "react";

/**
 * CountryList component to display a list of countries.
 * @returns {JSX.Element} A grid of country cards.
 */
export default function CountryList(): JSX.Element {
  const { countries, loading, error } = useCountries();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {countries?.map((country) => (
        <Link
          href={`/country/${country.countryCode}`}
          key={country.countryCode}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {country.name}
              </h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
