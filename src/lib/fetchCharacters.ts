import { Character } from "@/types/character";

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}
