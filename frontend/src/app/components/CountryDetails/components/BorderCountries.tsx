import Link from "next/link";
import { BorderCountry } from "../../../interfaces/interfaces";
import { Card, CardContent } from "../../ui/card";

/**
 * BorderCountries component to display a list of border countries.
 * @param {Array<BorderCountry>} borders - The list of border countries.
 * @returns {JSX.Element} The border countries component.
 */
export const BorderCountries = ({ borders }: { borders: BorderCountry[] }) => (
  <Card className="mb-8">
    <CardContent className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Border Countries</h2>
      <div className="flex flex-wrap gap-2 text-gray-600">
        {borders.length > 0 && borders.map((border) => (
          <Link
            href={`/country/${border.countryCode}`}
            key={border.countryCode}
            className="px-4 py-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            aria-label={`View details for ${border.commonName}`}
          >
            {border.commonName}
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
);