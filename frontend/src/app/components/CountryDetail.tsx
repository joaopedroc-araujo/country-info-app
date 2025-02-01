"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "./ui/card";
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

export default function CountryDetail({
  countryCode,
}: {
  countryCode: string;
}) {
  const [countryData, setCountryData] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await fetchCountryDetails(countryCode);
        setCountryData(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCountryData();
  }, [countryCode]);

  if (loading) return <div>Loading country details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!countryData) return <div>No country data found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={countryData.flag}
            alt={`${countryData.name} flag`}
            width={80}
            height={60}
            className="rounded shadow"
          />
          <h1 className="text-4xl font-bold">{countryData.name}</h1>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
            <div className="flex flex-wrap gap-2">
              {countryData.borderCountries.map((border) => (
                <Link
                  href={`/country/${border.code}`}
                  key={border.code}
                  className="px-4 py-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {border.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Population Over Time
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={countryData.populationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Year", position: "bottom" }}
                  />
                  <YAxis
                    label={{
                      value: "Population",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="population"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
