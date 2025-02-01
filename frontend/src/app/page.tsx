import CountryList from "./components/CountryList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Countries</h1>
      <CountryList />
    </div>
  );
}
