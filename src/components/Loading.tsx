import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
      <span className="ml-3 text-blue-600 font-medium">Loading...</span>
    </div>
  );
}
