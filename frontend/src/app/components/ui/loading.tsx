import { JSX } from "react";

/**
 * LoadingSpinner component to display a loading animation.
 * @returns {JSX.Element} A spinning loader.
 */

export const LoadingSpinner = (): JSX.Element => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div
      className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
      aria-label="Loading"
    ></div>
  </div>
);