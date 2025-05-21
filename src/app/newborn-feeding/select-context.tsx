"use client";
import React, { createContext, useContext, useState } from "react";

interface SelectContextType {
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export function SelectProvider({ children }: { children: React.ReactNode }) {
  const [activeSelectId, setActiveSelectId] = useState<string | null>(null);

  return (
    <SelectContext.Provider value={{ activeSelectId, setActiveSelectId }}>
      {children}
    </SelectContext.Provider>
  );
}

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
}
