import CustomSelect from "../components/CustomSelect";

// Espera traer miembros de un grupo. Aquí un mock simple:
export default function SearchGroup({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  // value debe ser un array de miembros [{id}, ...]
  const groupsMock = [
    { value: "groupA", label: "Group A", members: [{ id: "A-1" }, { id: "A-2" }] },
    { value: "groupB", label: "Group B", members: [{ id: "B-1" }] },
  ];

  const handleChange = (groupValue) => {
    const g = groupsMock.find((g) => g.value === groupValue);
    onChange(g ? g.members : []);
  };

  return (
    <CustomSelect
      label={label}
      placeholder={placeholder}
      value={""}
      onChange={handleChange}
      required={required}
      options={groupsMock.map(({ value, label }) => ({ value, label }))}
    />
  );
}
