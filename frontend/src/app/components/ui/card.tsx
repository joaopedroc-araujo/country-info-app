import { CardProps } from "@/app/interfaces/interfaces";
import { JSX } from "react";

export function Card({ children, className = "" }: CardProps): JSX.Element {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
