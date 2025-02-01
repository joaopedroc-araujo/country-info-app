import CountryDetail from "@/app/components/CountryDetail";

export default function CountryPage({ params }: { params: { code: string } }) {
  return <CountryDetail countryCode={params.code} />;
}
