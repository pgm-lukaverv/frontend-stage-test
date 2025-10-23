import { fetchCharacters } from "@/lib/fetchCharacters";
import { Character } from "@/types/character";
import { isEvilCharacter } from "@/lib/isEvilCharacter";
import ClientAddToTeam from "@/components/AddToTeam";
import Link from "next/link";
import ClientImageWithFallback from "@/components/ClientImageWithFallback";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const characters: Character[] = await fetchCharacters();
  const character = characters.find((c) => c.id === Number(id));

  const currentIndex = characters.findIndex((c) => c.id === Number(id));
  const prevCharacter = characters[currentIndex - 1];
  const nextCharacter = characters[currentIndex + 1];

  if (!character) {
    return <div className="p-8">Character not found.</div>;
  }

  // Character detail page
  // Shows character info, image, evil status, navigation, and add-to-team
  const isEvil = isEvilCharacter(character);
  return (
    <main
      className={`max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl mt-12 border-2 ${
        isEvil ? "border-red-500" : "border-yellow-500"
      }`}
    >
      {/* Back navigation */}
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
                // Show not found if character doesn't exist
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
        {/* Character image with fallback and colored border */}
        <div className="relative w-40 h-40 mb-6">
          <ClientImageWithFallback
            src={
              character.image && character.image.trim() !== ""
                ? character.image
                : "/placeholder.png"
            }
            alt={character.name}
            width={160}
            height={160}
            className={`rounded-full object-cover w-full h-full border-4 shadow ${
              isEvil ? "border-red-400" : "border-yellow-400"
            }`}
          />
        </div>
        {/* Character name and evil badge */}
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
        {/* Add-to-Team button (hidden for evil) */}
        {!isEvil && (
          <ClientAddToTeam
            character={character}
            className="inline-flex items-center gap-2 font-extrabold text-base rounded-full px-6 py-3 mt-2 mb-4 border-2 border-yellow-600 shadow-lg hover:scale-105 hover:shadow-yellow-400/60 transition-all duration-200"
          />
        )}
        {/* Character stats grid */}
        <div className="grid grid-cols-2 gap-6 w-full mb-6">
          {[
            {
              label: "Gender",
              value: character.gender ? character.gender : "unknown",
            },
            {
              label: "Species",
              value: character.species ? character.species : "unknown",
            },
            {
              label: "Homeworld",
              value: character.homeworld ? character.homeworld : "unknown",
            },
            {
              label: "Height",
              value: character.height ? `${character.height} m` : "unknown",
            },
            {
              label: "Mass",
              value: character.mass ? `${character.mass} kg` : "unknown",
            },
            {
              label: "Hair Color",
              value: character.hairColor ? character.hairColor : "N/A",
            },
            {
              label: "Skin Color",
              value: character.skinColor ? character.skinColor : "N/A",
            },
            {
              label: "Eye Color",
              value: character.eyeColor ? character.eyeColor : "N/A",
            },
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
        {/* Character wiki, birth, death, affiliations, etc. */}
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
