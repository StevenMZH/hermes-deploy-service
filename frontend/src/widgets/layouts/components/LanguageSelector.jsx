import { useLang } from "../../../context/LangContext";

const LanguageSelector = () => {
  const { lang, changeLanguage } = useLang();

  const handleChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <select value={lang} onChange={handleChange} className="h5">
      <option value="en" className="h5">English</option>
      <option value="es" className="h5">Español</option>
    </select>
  );
};

export default LanguageSelector;


// import { useEffect } from "react";
// import { useLang } from "../../../context/LangContext";
// import CustomSelect from "../../atomics/CustomSelect";

// const LanguageSelector = () => {
//   const { lang, changeLanguage } = useLang();

//   useEffect(() => {
//     if (!lang) {
//       changeLanguage("en"); // idioma por defecto
//     }
//   }, [lang, changeLanguage]);

//   const handleChange = (option) => {
//     changeLanguage(option.value);
//   };

//   return (
//     <CustomSelect
//       value={{ value: lang, label: lang === "es" ? "Español" : "English" }}
//       onChange={handleChange}
//       options={[
//         { value: "en", label: "English" },
//         { value: "es", label: "Español" },
//       ]}
//     />
//   );
// };

// export default LanguageSelector;
