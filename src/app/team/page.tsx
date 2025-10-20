export default function TeamPage() {
  // Placeholder array for 5 slots
  const placeholders = Array(5).fill(null);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-12">Your Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-6xl justify-center items-center">
        {placeholders.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-gray-900 border-4 border-yellow-500 rounded-3xl shadow-2xl h-72 w-full max-w-xs mx-auto"
          >
            <span className="text-7xl mb-4">⭐️</span>
            <span className="text-yellow-400 font-extrabold text-2xl">
              Slot {idx + 1}
            </span>
            <span className="text-gray-400 text-lg mt-4">Empty</span>
          </div>
        ))}
      </div>
    </main>
  );
}
