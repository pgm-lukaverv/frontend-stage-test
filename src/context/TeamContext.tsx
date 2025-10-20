"use client";
import { createContext, useContext, useState } from "react";
import { Character } from "@/types/character";

type TeamContextType = {
  team: Character[];
  addToTeam: (character: Character) => void;
  removeFromTeam: (id: number) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within a TeamProvider");
  return context;
};

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [team, setTeam] = useState<Character[]>([]);

  const addToTeam = (character: Character) => {
    if (team.length < 5 && !team.some((member) => member.id === character.id)) {
      setTeam([...team, character]);
    }
  };

  const removeFromTeam = (id: number) => {
    setTeam(team.filter((member) => member.id !== id));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
