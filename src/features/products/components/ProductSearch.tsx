import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { ProductList } from './ProductList';
import './ProductSearch.css';
import { SearchInput } from './SearchInput';

const DEBOUNCE_DELAY_MS = 400;

export function ProductSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const isTyping = query !== debouncedQuery;

  function handleClearSearch() {
    setQuery('');
    setDebouncedQuery('');
  }

  return (
    <section className="product-search">
      <div className="product-search__header">
        <p className="product-search__eyebrow">Digital catalog</p>
        <h1>Products</h1>
      </div>

      <SearchInput
        value={query}
        onChange={setQuery}
        onClear={handleClearSearch}
      />

      <p className="product-search__status" aria-live="polite">
        {isTyping
          ? 'Typing...'
          : `${filteredProducts.length} product(s) found`}
      </p>

      <ProductList products={filteredProducts} />
    </section>
  );
}
