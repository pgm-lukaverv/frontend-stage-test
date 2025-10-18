import { fetchCharacters } from "@/lib/fetchCharacters";
import Image from "next/image";

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterDetailPage({
  params,
}: CharacterPageProps) {
  const characters = await fetchCharacters();
  const character = characters.find((c) => c.id === Number(params.id));

  if (!character) {
    return <div className="p-8">Character not found.</div>;
  }

  return (
    <main className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl mt-12">
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-6">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            sizes="160px"
          />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-400 tracking-tight drop-shadow-lg text-center">
          {character.name}
        </h1>
        <div className="grid grid-cols-2 gap-6 w-full mb-6">
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Gender</span>
            <span className="text-lg font-semibold text-white">
              {character.gender}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Species</span>
            <span className="text-lg font-semibold text-white">
              {character.species}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Homeworld</span>
            <span className="text-lg font-semibold text-white">
              {character.homeworld}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Height</span>
            <span className="text-lg font-semibold text-white">
              {character.height} m
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Mass</span>
            <span className="text-lg font-semibold text-white">
              {character.mass} kg
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Hair Color</span>
            <span className="text-lg font-semibold text-white">
              {character.hairColor ? character.hairColor : "N/A"}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Skin Color</span>
            <span className="text-lg font-semibold text-white">
              {character.skinColor}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Eye Color</span>
            <span className="text-lg font-semibold text-white">
              {character.eyeColor}
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center">
            <span className="text-sm text-gray-400">Cybernetics</span>
            <span className="text-lg font-semibold text-white">
              {character.cybernetics || "None"}
            </span>
          </div>
        </div>
        <div className="w-full mb-6">
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center mb-2">
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
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center mb-2">
            <span className="text-sm text-gray-400">Born</span>
            <span className="text-lg font-semibold text-white text-center">
              {character.born} (
              {character.bornLocation ? character.bornLocation : "N/A"})
            </span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center mb-2">
            <span className="text-sm text-gray-400">Died</span>
            <span className="text-lg font-semibold text-white text-center">
              {character.died !== null && character.died !== undefined
                ? `${character.died} (${character.diedLocation})`
                : "N/A"}
            </span>
          </div>
          {Array.isArray(character.affiliations) &&
            character.affiliations.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-4 mt-2">
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
            <div className="bg-gray-800 rounded-xl p-4 mt-2">
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
              <div className="bg-gray-800 rounded-xl p-4 mt-2">
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
              <div className="bg-gray-800 rounded-xl p-4 mt-2">
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
