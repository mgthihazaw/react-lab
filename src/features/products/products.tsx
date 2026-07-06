import type React from "react";
import { Input } from "../../components/Input";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";

const products = [
  { id: 1, name: "PA01", price: 10.99 },
  { id: 2, name: "PA02", price: 19.99 },
  { id: 3, name: "PB01", price: 5.99 },
  { id: 4, name: "PB02", price: 14.99 },
  { id: 5, name: "PC01", price: 7.99 },
  { id: 6, name: "PC02", price: 12.99 },
];

export const Products: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query input to avoid excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      console.log("Debounced query updated to:", query);
    }, 0); // Adjust the debounce delay as needed

    console.log("Setting debounce timeout", handler);
    
    return () => {
        console.log("Cleaning up debounce timeout", handler);
      clearTimeout(handler);
    };
  }, [query]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );
  console.log("Rendering", filteredProducts);
 
  return (
    <div>
      <h1>Products</h1>
      <p>This is the products page.</p>
      <div>
        <Input label={"Search...."} value={query} onChange={(val) => setQuery(val)} />
      </div>
      <Card title={"Query"}>{query}</Card>
      <Card title={"Debounced Query"}>{debouncedQuery}</Card>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};
