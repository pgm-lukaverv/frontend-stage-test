"use client";
import { useEffect, useState } from "react";
import { Character } from "@/types/character";
import { fetchCharacters } from "@/lib/fetchCharacters";
import Image from "next/image";
import Link from "next/link";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters()
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  });

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <h1 className="text-yellow-400 font-extrabold text-4xl mb-8 text-center drop-shadow-lg tracking-wide font-sans">
        Star Wars Characters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-gray-900 border border-yellow-500 shadow-lg hover:shadow-yellow-500/40 transition-shadow flex flex-col items-center p-4 rounded-2xl hover:ring-2 hover:ring-yellow-400"
          >
            <Link
              href={`/characters/${character.id}`}
              className="w-full flex flex-col items-center"
            >
              <div className="w-32 h-32 flex items-center justify-center mb-4 relative">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={128}
                  height={128}
                  className="rounded-full object-cover w-full h-full border-4 border-yellow-400 shadow"
                />
              </div>
              <h2 className="text-xl font-bold text-yellow-300 text-center mb-2 tracking-wide font-sans">
                {character.name}
              </h2>
            </Link>
            <button
              className="bg-yellow-400 text-gray-900 font-bold rounded-full px-4 py-2 mt-4 hover:bg-yellow-500 transition shadow-lg"
              disabled
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <div className="bg-gray-800 border border-yellow-500 rounded-2xl p-6 shadow-lg w-full max-w-2xl flex flex-col items-center">
          <h2 className="text-yellow-400 font-bold text-2xl mb-2 tracking-wide">
            Your Team (Coming Soon)
          </h2>
          <p className="text-gray-300 text-center">
            Assemble up to 5 heroes to fight the dark side. Click &quot;Add to Team&quot;
            on a character to add them here.
          </p>
        </div>
      </div>
    </main>
  );
}
