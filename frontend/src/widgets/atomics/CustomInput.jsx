import {Input} from "@heroui/react";

export default function CustomInput({
  label,
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  required = false,
  className = "",
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      isRequired={required}
      className={className}
      variant="bordered"
      size="md"
    />
  );
}
