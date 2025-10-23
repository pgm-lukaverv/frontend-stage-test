"use client";
import { Character } from "@/types/character";
import { useTeam } from "@/context/TeamContext";
import { isEvilCharacter } from "@/lib/isEvilCharacter";

type AddToTeamProps = {
  character: Character;
  className?: string;
};

export default function ClientAddToTeam({
  character,
  className = "", // <-- accept the prop here!
}: AddToTeamProps) {
  const { team, addToTeam, removeFromTeam } = useTeam();
  const isInTeam = team.some((member) => member.id === character.id);
  const teamFull = team.length >= 5;
  const isEvil = isEvilCharacter(character);
  const disabled = isEvil || (!isInTeam && teamFull);

  if (isEvil) return null;

  const handleClick = () => {
    if (isInTeam) {
      removeFromTeam(character.id);
    } else {
      addToTeam(character);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`font-bold rounded-full px-4 py-2 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
        isInTeam
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
      } ${className}`}
      aria-pressed={isInTeam}
      title={
        isInTeam
          ? "Remove from team"
          : teamFull
          ? "Team is full"
          : "Add to team"
      }
    >
      {teamFull && !isInTeam
        ? "Team is Full"
        : isInTeam
        ? "Remove"
        : "Add to Team"}{" "}
    </button>
  );
}
