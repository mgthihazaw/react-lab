import { Button } from "../../../components/Button";

type SearchFormProps = {
  value: string;
  isLoading: boolean;
  onChange: (newQuery: string) => void;
  onSubmit: () => void;
};

export function SearchForm({ value, isLoading, onChange, onSubmit }: SearchFormProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="github-users__search" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search by username..."
        aria-label="Search GitHub users"
      />

      <Button type="submit" disabled={!value.trim() || isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
