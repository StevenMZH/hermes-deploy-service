import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

export default function CustomSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CustomInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <CustomButton onClick={onSearch}>
        Search
      </CustomButton>
    </div>
  );
}
