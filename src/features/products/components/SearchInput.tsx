type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function SearchInput({ value, onChange, onClear }: SearchInputProps) {
  return (
    <div className="product-search__input-group">
      <label htmlFor="product-search">Search products</label>

      <div className="product-search__field">
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder="Search by name, category, or description..."
        />

        {value && (
          <button type="button" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
