// src/context/PreferencesContext.js
import { createContext, useContext, useEffect, useState } from "react";

const PreferencesContext = createContext();

export const usePreferences = () => useContext(PreferencesContext);

// Hooks individuales para cada preferencia
export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useContext(PreferencesContext);
  return { theme, setTheme, toggleTheme };
};

export const useWeightUnit = () => {
  const { weightUnit, setWeightUnit } = useContext(PreferencesContext);
  return { weightUnit, setWeightUnit };
};


export function PreferencesProvider({ children }) {
  // Theme
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };
  const [theme, setTheme] = useState(getInitialTheme);
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Weight unit
  const getInitialWeightUnit = () => localStorage.getItem("weightUnit") || "kg";
  const [weightUnit, setWeightUnit] = useState(getInitialWeightUnit);
  useEffect(() => localStorage.setItem("weightUnit", weightUnit), [weightUnit]);

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        weightUnit,
        setWeightUnit,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
