import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const RegistryContext = createContext(null);

export function RegistryProvider({ children }) {
  // Estado base (desde 0)
  const [users, setUsers] = useState(null);
  const [owners, setOwners] = useState(null);
  const [locations, setLocations] = useState(null);

  // Getters simples
  const getUsers = useCallback(() => users, [users]);
  const getOwners = useCallback(() => owners, [owners]);
  const getLocations = useCallback(() => locations, [locations]);

  // Obtener todos juntos
  const getAll = useCallback(() => ({ users, owners, locations }), [users, owners, locations]);

  // Exponer setters también, para que otra capa (servicios/hooks) los llene
  const value = useMemo(() => ({
    // valores
    users, owners, locations,
    // getters
    getUsers, getOwners, getLocations, getAll,
    // setters (para que el resto de la app pueda cargar/actualizar)
    setUsers, setOwners, setLocations,
  }), [users, owners, locations, getUsers, getOwners, getLocations, getAll]);

  return (
    <RegistryContext.Provider value={value}>
      {children}
    </RegistryContext.Provider>
  );
}

export function useRegistry() {
  const ctx = useContext(RegistryContext);
  if (!ctx) throw new Error("useRegistry must be used within a <RegistryProvider>");
  return ctx;
}
