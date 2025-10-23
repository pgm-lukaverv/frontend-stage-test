// Team page
// Shows current team members and empty slots, allows removing members
"use client";
import ClientImageWithFallback from "@/components/ClientImageWithFallback";
import { useTeam } from "@/context/TeamContext";

export default function TeamPage() {
  // Get team and remove function from context
  const { team, removeFromTeam } = useTeam();
  // Fill up to 5 slots with team members or null
  const slots = Array.from({ length: 5 }, (_, i) => team[i] || null);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-12">Your Team</h1>
      {/* Team grid: members and empty slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-6xl justify-center items-center mb-12">
        {slots.map((member, idx) =>
          member ? (
            // Team member card
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-gray-900 border-4 border-yellow-500 rounded-3xl shadow-2xl h-72 w-full max-w-xs mx-auto"
            >
              <ClientImageWithFallback
                src={
                  member.image && member.image.trim() !== ""
                    ? member.image
                    : "/placeholder.png"
                }
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full object-cover w-40 h-40 border-4 shadow mb-4 border-yellow-400"
              />
              <span className="text-yellow-400 font-extrabold text-xl mb-2 text-center">
                {member.name}
              </span>
              {/* Remove from team button */}
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition"
                onClick={() => removeFromTeam(member.id)}
              >
                Remove
              </button>
            </div>
          ) : (
            // Empty slot card
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
          )
        )}
      </div>
    </main>
  );
}
