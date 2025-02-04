"use client";

import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { useCountries } from "../hooks/useCountries.hook";

export default function CountryList() {
  const { countries, loading, error } = useCountries();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 text-lg mb-2">Error loading countries</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
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
