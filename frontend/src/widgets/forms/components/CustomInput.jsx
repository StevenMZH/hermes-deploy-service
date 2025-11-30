import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

export const CustomInput = forwardRef(function CustomInput(
  {
    label,
    placeholder = "",
    value,
    onChange,
    type = "text",
    validations = {},
    className = "",
    labelClassName = "",
    fieldClassName = "",
    onKeyDown,       
    ...rest          
  },
  ref
) {
  const { t } = useTranslation();

  return (
    <div className={`customField gap5 ${className}`}>
      {label && (
        <label className={`customField-label row-left t-body5 ${labelClassName}`}>
          {label}
          {validations.required && (
            <span className="requiredText">{t("required")}</span>
          )}
        </label>
      )}
      <input
        ref={ref}                // 👈 importante para poder hacer focus()
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}    // 👈 aquí capturas Enter en el form
        {...validations}         // required, minLength, etc.
        {...rest}
        className={`customInput t-body4 ${fieldClassName}`}
      />
    </div>
  );
});

export default CustomInput;
