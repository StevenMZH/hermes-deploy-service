import { useEffect } from "react";
import { useAppState } from "../../../context/AppStateContext";
import CustomInput from "../../forms/components/CustomInput";
import CustomSelect from "../../forms/components/CustomSelect";
import { useTranslation } from "react-i18next";
import { usePreferences } from "../../../context/PreferencesContext";
import { useLang } from "../../../context/LangContext";

export function Settings() {
  const { t, ready } = useTranslation();
  const { language, setLanguage } = useLang();
  const { weightUnit, setWeightUnit } = usePreferences();

  // const { setForm } = useAppState();
  // useEffect(() => {
  //   setForm("settings");
  //   return () => setForm("none");
  // }, [setForm]);

  return (
    <div className="full-view flex column-left gap20">
      <p className="h3">{t("settings")}</p>
    
      {/* <div className="card gap10">
      </div> */}

    </div>
  );
}


export default Settings;


