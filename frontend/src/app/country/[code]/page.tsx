import CountryDetail from "@/app/components/CountryDetail";

export default async function CountryPage({
  params,
}: {
  params: { code: string };
}) {
  return <CountryDetail countryCode={params.code} />;
}
