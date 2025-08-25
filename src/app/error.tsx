"use client";

export default function Error({
  error,
}: // reset,
{
  error: Error & { digest?: string };
  // reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
