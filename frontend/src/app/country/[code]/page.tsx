import * as React from 'react'
import CountryDetail from "@/app/components/CountryDetails/CountryDetail";

export default function CountryPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = params;
  return <CountryDetail countryCode={code} />;
}
