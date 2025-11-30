import { useTranslation } from "react-i18next";

export function CustomInput({
  label,
  placeholder = "",
  value,
  onChange,
  type = "text",
  validations = {}, // <-- nuevo
  className = "",
  labelClassName = "",
  fieldClassName = "",
}) {
  const { t } = useTranslation();
  
  return (
    <div className={`customField gap5 ${className}`}>
      {label && (
        <label className={`customField-label row-left t-body5 ${labelClassName}`}>
          {label}
          {validations.required && <span className="requiredText">{t("required")}</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...validations} // <-- aplica todas las validaciones del input
        className={`customInput t-body4 ${fieldClassName}`}
      />
    </div>
  );
}

export default CustomInput;
