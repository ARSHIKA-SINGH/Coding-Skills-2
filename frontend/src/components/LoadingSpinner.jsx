export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      {/* Spinner */}
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-sm text-gray-500 animate-pulse">
        {text}
      </p>

    </div>
  );
}