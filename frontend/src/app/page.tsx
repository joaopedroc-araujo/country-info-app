import { JSX } from "react";
import CountryList from "./components/CountryList/CountryList";

/**
 * Home component that renders the main page with a list of countries.
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home(): JSX.Element {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Countries</h1>
      <CountryList />
    </div>
  );
}