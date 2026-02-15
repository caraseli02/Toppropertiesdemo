export function LoadingCard() {
  return (
    <div className="bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] animate-pulse">
      <div className="h-[200px] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-3 py-2">
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
