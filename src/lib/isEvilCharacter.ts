import { Character } from "@/types/character";

export function isEvilCharacter(character: Character): boolean {
  if (/Darth|Sith/i.test(character.name)) {
    return true;
  }

  if (
    Array.isArray(character.affiliations) &&
    character.affiliations.some((affilation) => /Darth|Sith/i.test(affilation))
  ) {
    return true;
  }

  if (
    Array.isArray(character.masters) &&
    character.masters.some((master) => /Darth/i.test(master))
  ) {
    return true;
  }

  return false;
}
