import { createContext, useContext, useState } from "react";

// Crear el contexto
const AppStateContext = createContext();

// Hook para acceder al contexto fácilmente
export const useAppState = () => useContext(AppStateContext);

// Proveedor del contexto
export function AppStateProvider({ children }) {
  const [form, setForm] = useState("none");

  return (
    <AppStateContext.Provider value={{ form, setForm }}>
      {children}
    </AppStateContext.Provider>
  );
}
