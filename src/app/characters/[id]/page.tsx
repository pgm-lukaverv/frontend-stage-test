import { fetchCharacters } from "@/lib/fetchCharacters";
import { isEvilCharacter } from "@/lib/isEvilCharacter";
import Link from "next/link";
import Image from "next/image";

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterDetailPage({
  params,
}: CharacterPageProps) {
  const characters = await fetchCharacters();
  const character = characters.find((c) => c.id === Number(params.id));

  const currentIndex = characters.findIndex((c) => c.id === Number(params.id));
  const prevCharacter = characters[currentIndex - 1];
  const nextCharacter = characters[currentIndex + 1];

  if (!character) {
    return <div className="p-8">Character not found.</div>;
  }

  const isEvil = isEvilCharacter(character);
  return (
    <main
      className={`max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl mt-12 border-2 ${
        isEvil ? "border-red-500" : "border-yellow-500"
      }`}
    >
      <div className="mb-6 w-full flex justify-start">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-yellow-400 font-bold rounded-full px-4 py-2 transition-transform hover:scale-105 hover:text-yellow-300 focus:outline-none"
        >
          ← Back to Characters
        </Link>
      </div>
      <div className="flex flex-col items-center">
        {/* Navigation arrows */}
        <div className="flex justify-between items-center w-full mb-4">
          {prevCharacter ? (
            <Link href={`/characters/${prevCharacter.id}`}>
              <button
                className={`text-3xl px-4 py-2 ${
                  isEvil
                    ? "text-red-400 hover:text-red-300"
                    : "text-yellow-400 hover:text-yellow-300"
                }`}
                aria-label="Previous character"
              >
                ←
              </button>
            </Link>
          ) : (
            <span />
          )}
          {nextCharacter ? (
            <Link href={`/characters/${nextCharacter.id}`}>
              <button
                className={`text-3xl px-4 py-2 ${
                  isEvil
                    ? "text-red-400 hover:text-red-300"
                    : "text-yellow-400 hover:text-yellow-300"
                }`}
                aria-label="Next character"
              >
                →
              </button>
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="relative w-40 h-40 mb-6">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className={`rounded-full object-cover border-4 shadow-lg ${
              isEvil ? "border-red-500" : "border-yellow-400"
            }`}
            sizes="160px"
          />
        </div>
        <h1
          className={`text-4xl font-extrabold mb-4 tracking-wide drop-shadow-lg text-center font-sans flex flex-col items-center gap-2 ${
            isEvil ? "text-red-500" : "text-yellow-400"
          }`}
        >
          {character.name}
          {isEvilCharacter(character) && (
            <span className="inline-block px-3 py-1 rounded-full bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-md animate-pulse border-2 border-red-400">
              Evil
            </span>
          )}
        </h1>
        <div className="grid grid-cols-2 gap-6 w-full mb-6">
          {[
            { label: "Gender", value: character.gender },
            { label: "Species", value: character.species },
            { label: "Homeworld", value: character.homeworld },
            { label: "Height", value: `${character.height} m` },
            { label: "Mass", value: `${character.mass} kg` },
            {
              label: "Hair Color",
              value: character.hairColor ? character.hairColor : "N/A",
            },
            { label: "Skin Color", value: character.skinColor },
            { label: "Eye Color", value: character.eyeColor },
            {
              label: "Cybernetics",
              value: character.cybernetics || "None",
              isGray: true,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-4 flex flex-col items-center shadow-lg ${
                item.isGray ? "bg-gray-800" : "bg-gray-900"
              } border ${isEvil ? "border-red-500" : "border-yellow-500"}`}
            >
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-lg font-semibold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        {!isEvil && (
          <div className="flex justify-center mb-8">
            <button
              className="bg-yellow-400 text-gray-900 font-extrabold text-xl rounded-full px-8 py-4 hover:bg-yellow-500 transition shadow-2xl border-4 border-yellow-600 drop-shadow-lg hover:animate-pulse"
              disabled
            >
              <span className="flex items-center gap-2">
                <span>⭐️</span>
                Add to Team
                <span>⭐️</span>
              </span>
            </button>
          </div>
        )}
        <div className="w-full mb-6">
          <div
            className={`bg-gray-900 border rounded-xl p-4 flex flex-col items-center mb-2 shadow-lg ${
              isEvil ? "border-red-500" : "border-yellow-500"
            }`}
          >
            <span className="text-sm text-gray-400">Wiki</span>
            <a
              href={character.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-400 underline text-center"
            >
              {character.wiki}
            </a>
          </div>
          <div
            className={`bg-gray-900 border rounded-xl p-4 flex flex-col items-center mb-2 shadow-lg ${
              isEvil ? "border-red-500" : "border-yellow-500"
            }`}
          >
            <span className="text-sm text-gray-400">Born</span>
            <span className="text-lg font-semibold text-white text-center">
              {character.born} (
              {character.bornLocation ? character.bornLocation : "N/A"})
            </span>
          </div>
          <div
            className={`bg-gray-900 border rounded-xl p-4 flex flex-col items-center mb-2 shadow-lg ${
              isEvil ? "border-red-500" : "border-yellow-500"
            }`}
          >
            <span className="text-sm text-gray-400">Died</span>
            <span className="text-lg font-semibold text-white text-center">
              {character.died !== null && character.died !== undefined
                ? `${character.died} (${character.diedLocation})`
                : "N/A"}
            </span>
          </div>
          {Array.isArray(character.affiliations) &&
            character.affiliations.length > 0 && (
              <div
                className={`bg-gray-900 border rounded-xl p-4 mt-2 shadow-lg ${
                  isEvil ? "border-red-500" : "border-yellow-500"
                }`}
              >
                <span className="text-sm text-gray-400 block mb-2">
                  Affiliations
                </span>
                <ul className="list-disc ml-6 text-white text-base">
                  {character.affiliations.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          {Array.isArray(character.masters) && character.masters.length > 0 && (
            <div
              className={`bg-gray-900 border rounded-xl p-4 mt-2 shadow-lg ${
                isEvil ? "border-red-500" : "border-yellow-500"
              }`}
            >
              <span className="text-sm text-gray-400 block mb-2">Masters</span>
              <ul className="list-disc ml-6 text-white text-base">
                {character.masters.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {Array.isArray(character.apprentices) &&
            character.apprentices.length > 0 && (
              <div
                className={`bg-gray-900 border rounded-xl p-4 mt-2 shadow-lg ${
                  isEvil ? "border-red-500" : "border-yellow-500"
                }`}
              >
                <span className="text-sm text-gray-400 block mb-2">
                  Apprentices
                </span>
                <ul className="list-disc ml-6 text-white text-base">
                  {character.apprentices.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          {Array.isArray(character.formerAffiliations) &&
            character.formerAffiliations.length > 0 && (
              <div
                className={`bg-gray-900 border rounded-xl p-4 mt-2 shadow-lg ${
                  isEvil ? "border-red-500" : "border-yellow-500"
                }`}
              >
                <span className="text-sm text-gray-400 block mb-2">
                  Former Affiliations
                </span>
                <ul className="list-disc ml-6 text-white text-base">
                  {character.formerAffiliations.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}
