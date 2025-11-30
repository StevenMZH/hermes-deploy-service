import { useTranslation } from "react-i18next";
import { useRef } from "react";
import CustomInput from "./CustomInput.jsx";
import { useAppState } from "../../../context/AppStateContext.jsx";

export default function EditForm({
  title,
  inputList,
  onSubmit,
  onRequestClose,
  onDelete,
}) {
  const { t } = useTranslation();
  const { formObject, setFormObject } = useAppState();
  const inputRefs = useRef([]);
  
  const handleChange = (key, value) => {
    setFormObject((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();          
    await onSubmit?.(formObject);       
    onRequestClose?.();
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
        handleSubmit(e);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="full-view column-left gap20 editForm"
    >
      <p className="h3 full-w">
        {`${t(title)} (${formObject?.name || ""})`}
      </p>

      <div className="full-view column-left gap10">
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

      <div className="full-w row-right gap10">
        <button type="submit" className="hl1 h5">
          {t("update")}
        </button>
      </div>
    </form>
  );
}
