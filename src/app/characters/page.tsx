"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  image: string;
};

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Star Wars Characters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-4 border border-gray-100"
          >
            <div className="w-40 h-40 flex items-center justify-center mb-4">
              <Image
                src={character.image}
                alt={character.name}
                width={160}
                height={160}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
              {character.name}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}
