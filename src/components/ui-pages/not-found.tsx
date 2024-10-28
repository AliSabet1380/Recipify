"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="text-center space-y-6 p-8 max-w-lg">
        <h1 className="text-6xl font-extrabold text-red-500 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-semibold">Page Not Found</h2>
        <p className="text-gray-400">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Button
          onClick={onGoBack}
          className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out transform hover:-translate-y-1"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
