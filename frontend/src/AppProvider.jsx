import { HeroUIProvider } from "@heroui/react";
import { LangProvider } from "./context/LangContext";
import { PreferencesProvider } from "./context/PreferencesContext";
import { AppStateProvider } from "./context/AppStateContext";

const AppProviders = ({ children }) => {
  return (
    <HeroUIProvider>
      <LangProvider>
        <PreferencesProvider>
          <AppStateProvider>
            {children}
          </AppStateProvider>
        </PreferencesProvider>
      </LangProvider>
    </HeroUIProvider>
  );
};

export { AppProviders };
