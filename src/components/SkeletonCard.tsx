export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col items-center animate-pulse">
      <div className="w-32 h-32 rounded-full bg-gray-700 mb-4" />
      <div className="h-6 w-24 bg-gray-700 rounded mb-2" />
      <div className="h-4 w-16 bg-gray-700 rounded" />
      <div className="h-8 w-24 bg-gray-700 rounded mt-4" />
    </div>
  );
}
