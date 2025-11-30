import { useTranslation } from "react-i18next";
import CustomInput from "../components/CustomInput.jsx";

export default function RequestForm({
  title,
  inputList,
  formObject,
  handleChange,
  onSubmit,
  button_str
}) {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={onSubmit}
      className="full-view column-left gap30 requestForm"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();   
          onSubmit(e);            
        }
      }}
    >
      <p className="h3 full-w">{title}</p>

      <div className="full-view column-left gap20">
        {inputList.map(({ label, valueKey, validations }) => (
          <CustomInput
            key={valueKey}
            label={t(label)}
            placeholder={t(label)}
            value={formObject?.[valueKey] || ""}
            onChange={(v) => handleChange(valueKey, v)}
            validations={validations}
          />
        ))}
      </div>

      <div className="full-w row-right">
        <button type="submit" className="hl1 h5">
          {button_str || t("submit")}
        </button>
      </div>
    </form>
  );
}
