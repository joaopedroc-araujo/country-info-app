interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          block w-full rounded-md border border-gray-300 
          px-3 py-2 text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
          disabled:opacity-50
          ${error ? "border-red-500 focus:ring-red-600" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
