import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../routes";

// Context
const LangContext = createContext();

// Hook
export const useLang = () => useContext(LangContext);

// Provider
export function LangProvider({ children }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar idioma desde localStorage (si existe)
  const storedLang = localStorage.getItem("lang");
  const initialLang = storedLang || i18n.language || "es";

  const [lang, setLang] = useState(initialLang);

  const changeLanguage = (newLang) => {
    if (newLang === lang) return;

    const currentPath = location.pathname;

    // Encuentra la clave de ruta actual
    const routeKey = Object.keys(routes.en).find((key) => {
      return Object.values(routes).some((langRoutes) => {
        const pattern = langRoutes[key].replace(/:\w+/g, "[^/]+"); // reemplaza :id por regex
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(currentPath);
      });
    });

    if (!routeKey) {
      i18n.changeLanguage(newLang);
      setLang(newLang);
      localStorage.setItem("lang", newLang); // <-- GUARDAR
      navigate("/", { replace: true });
      return;
    }

    // Extraer parámetros dinámicos
    const paramMatches = {};
    const enRoute = routes.en[routeKey];
    const pathParts = currentPath.split("/").filter(Boolean);
    const routeParts = enRoute.split("/").filter(Boolean);

    routeParts.forEach((part, idx) => {
      if (part.startsWith(":")) {
        const paramName = part.slice(1);
        paramMatches[paramName] = pathParts[idx];
      }
    });

    // Construir nueva ruta traducida
    let newPath = routes[newLang][routeKey];
    Object.keys(paramMatches).forEach((param) => {
      newPath = newPath.replace(`:${param}`, paramMatches[param]);
    });

    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("lang", newLang); // <-- GUARDAR
    navigate(newPath, { replace: true });
  };

  // Sync cuando i18n cambie
  useEffect(() => {
    if (i18n.language !== lang) {
      setLang(i18n.language);
      localStorage.setItem("lang", i18n.language); // <-- SYNC AUTOMÁTICO
    }
  }, [i18n.language, lang]);

  // Al cargar el provider, aplicar el lang guardado a i18n
  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []); // solo 1 vez al montar

  return (
    <LangContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}
