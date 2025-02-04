export const ErrorMessage = ({ error }: { error: string }) => (
  <div className="text-center p-8">
    <div className="text-red-600 text-lg mb-2">Error loading countries</div>
    <div className="text-gray-600">{error}</div>
  </div>
);