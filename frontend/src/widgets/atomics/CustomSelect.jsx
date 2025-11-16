import {Input} from "@heroui/react";

export default function CustomSearch({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search",
  className = "",
}) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSearch?.(value)}
      placeholder={placeholder}
      startContent={<span role="img" aria-label="search">🔎</span>}
      variant="bordered"
      className={className}
    />
  );
}
