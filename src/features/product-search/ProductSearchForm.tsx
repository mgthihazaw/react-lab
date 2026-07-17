import React from "react";
import { useEffect } from "react";
import { useState } from "react";

void React;

type ProductSearchFormProps = {
  query: string;
  onSearch: (query: string) => void;
};

export function ProductSearchForm({ query, onSearch }: ProductSearchFormProps) {
  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSearch(draftQuery.trim());
  }

  return (
    <form className="products-toolbar__search" onSubmit={handleSubmit}>
      <label>
        <span>Search catalog</span>
        <input
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
          placeholder="Try react, keyboard, desk..."
        />
      </label>

      <button type="submit">
        <span aria-hidden="true">Search</span>
        <span>Apply</span>
      </button>
    </form>
  );
}
