import { useTranslation } from "react-i18next";
import { useRef } from "react";
import CustomInput from "../components/CustomInput.jsx";

export default function RequestForm({
  title,
  inputList,
  formObject,
  handleChange,
  onSubmit,
  button_str,
}) {
  const { t } = useTranslation();
  const inputRefs = useRef([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // El padre NO recibe el evento, solo dispara su lógica
    onSubmit?.();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const nextIndex = index + 1;
      const nextInput = inputRefs.current[nextIndex];

      if (nextInput) {
        nextInput.focus();
        if (typeof nextInput.select === "function") {
          nextInput.select();
        }
      } else {
        // último input → submit del form
        handleFormSubmit(e);
      }
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="full-view column-left gap30 requestForm"
    >
      <p className="h3 full-w">{title}</p>

      <div className="full-view column-left gap20">
        {inputList.map(({ label, valueKey, validations }, index) => (
          <CustomInput
            key={valueKey}
            label={t(label)}
            placeholder={t(label)}
            value={formObject?.[valueKey] || ""}
            onChange={(v) => handleChange(valueKey, v)}
            validations={validations}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
