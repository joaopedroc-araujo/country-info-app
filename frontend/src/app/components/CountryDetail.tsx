"use client";

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
import { useCountryDetails } from "../hooks/useCountryDetails.hook";
import { IoChevronBackCircleSharp } from "react-icons/io5";


interface CountryDetail {
  name: string;
  flagUrl: string;
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
  const { countryData, loading, error } = useCountryDetails(countryCode);

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
        <div className="text-red-600 text-lg mb-2">Error loading country details</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  if (!countryData) return <div>No country data found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-white hover:underline">
            { <IoChevronBackCircleSharp size={50} /> }
            </Link>
          <Image
            src={countryData.flagUrl}
            alt={`${countryData.name} flag`}
            width={80}
            height={60}
            className="rounded shadow"
          />
          <h1 className="text-4xl font-bold">{countryData.name}</h1>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">Border Countries</h2>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {countryData.borders?.map((border) => (
                <Link
                  href={`/country/${border.countryCode}`}
                  key={border.countryCode}
                  className="px-4 py-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {border.commonName}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">
              Population Over Time
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={countryData.population}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="year"
                    label={{ value: "Year", position: "bottom" }}
                  />
                  <YAxis
                    tickFormatter={(value) => value.toLocaleString()}
                    label={{
                      value: "Population",
                      angle: -90,
                      position: "insideLeft",
                      dy: -15,
                      dx: -2,
                      style: { fontSize: "12px", fill: "#333", fontWeight: "bold" },
                    }}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                    width={95}
                  />

                  <Tooltip
                    formatter={(value) => [`${value.toLocaleString()}`, "Population"]}
                    contentStyle={{ backgroundColor: "#ffffff", color: "#333", border: "1px solid #ddd" }}
                    itemStyle={{ color: "#2563eb" }}
                    labelStyle={{ color: "#111", fontWeight: "bold" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
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
