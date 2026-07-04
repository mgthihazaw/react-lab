type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder }) => {
  return (
    <label>
      <span>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
};
