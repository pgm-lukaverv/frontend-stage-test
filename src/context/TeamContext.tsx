"use client";
import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    // On mount, load from localStorage
    if (team.length === 0) {
      const saved = localStorage.getItem("team");
      if (saved) {
        setTeam(JSON.parse(saved));
      }
    } else {
      // On team change, save to localStorage
      localStorage.setItem("team", JSON.stringify(team));
    }
  }, [team]);

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
