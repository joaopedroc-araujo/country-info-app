import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { IoChevronBackCircleSharp } from "react-icons/io5";

/**
 * CountryHeader component to display the country name, flag, and back button.
 * @param {string} name - The name of the country.
 * @param {string} flagUrl - The URL of the country's flag.
 * @returns {JSX.Element} The country header component.
 */
export const CountryHeader = ({ name, flagUrl }: { name: string; flagUrl: string }): JSX.Element => (
  <div className="flex items-center gap-4 mb-6">
    <Link href="/" className="text-white hover:underline" aria-label="Go back">
      <IoChevronBackCircleSharp size={50} />
    </Link>
   { flagUrl !== '' && <Image
      src={flagUrl}
      alt={`${name} flag`}
      width={80}
      height={30}  
      className="rounded shadow"
    />}
    <h1 className="text-6xl font-bold">{name}</h1>
  </div>
);