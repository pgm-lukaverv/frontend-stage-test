"use client";
import { useEffect, useState } from "react";
import { Character } from "@/types/character";
import { fetchCharacters } from "@/lib/fetchCharacters";
import { isEvilCharacter } from "@/lib/isEvilCharacter";
import SkeletonCard from "@/components/SkeletonCard";
import Image from "next/image";
import Link from "next/link";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);

  useEffect(() => {
    setLoading(true);
    fetchCharacters()
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error))
      .finally(() => setLoading(false));
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <h1 className="text-yellow-400 font-extrabold text-4xl mb-8 text-center drop-shadow-lg tracking-wide font-sans">
        Star Wars Characters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-8 md:ml-0 w-full">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : currentCharacters.map((character) => {
              const evil = isEvilCharacter(character);
              return (
                <div
                  key={character.id}
                  className={`bg-gray-900 border shadow-lg transition-shadow flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl hover:ring-2 w-full max-w-xs mx-auto ${
                    evil
                      ? "border-red-500 hover:shadow-red-500/40 hover:ring-red-400"
                      : "border-yellow-500 hover:shadow-yellow-500/40 hover:ring-yellow-400"
                  }`}
                >
                  <Link
                    href={`/characters/${character.id}`}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-4 relative">
                      <Image
                        src={
                          character.image && character.image.trim() !== ""
                            ? character.image
                            : "https://wallpapers.com/images/hd/anonymous-profile-placeholder-34zkftbfh75t42k0.jpg"
                        }
                        alt={character.name}
                        width={128}
                        height={128}
                        className={`rounded-full object-cover w-full h-full border-4 shadow ${
                          evil ? "border-red-400" : "border-yellow-400"
                        }`}
                      />
                    </div>
                    <h2
                      className={`text-lg sm:text-xl font-bold text-center mb-2 tracking-wide font-sans break-words ${
                        evil ? "text-red-500" : "text-yellow-400"
                      }`}
                    >
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
              );
            })}
      </div>

      {!loading && totalPages > 0 && (
        <div className="flex flex-col items-center mt-8 space-y-2 w-full px-2 mb-16">
          {/* Items per page selector */}
          <div className="flex items-center mb-2">
            <label className="mr-2 text-yellow-300 font-semibold">
              Items per page:
            </label>
            <select
              value={charactersPerPage}
              onChange={(e) => {
                setCharactersPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing
              }}
              className="bg-gray-800 text-yellow-400 rounded px-2 py-1"
            >
              {[8, 12, 16].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="w-full">
              <div className="flex flex-wrap flex-row justify-center items-center gap-2 w-full mb-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 rounded w-auto ${
                      currentPage === i + 1
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-700 text-yellow-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-2 w-full">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 text-yellow-400 rounded disabled:opacity-50 w-auto"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 text-yellow-400 rounded disabled:opacity-50 w-auto"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
