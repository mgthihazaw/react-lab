import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: '1',
    name: 'React Handbook',
    category: 'Books',
    price: 29,
    description: 'A practical guide to modern React.',
  },
  {
    id: '2',
    name: 'TypeScript Pro Course',
    category: 'Courses',
    price: 99,
    description: 'Advanced TypeScript for frontend engineers.',
  },
  {
    id: '3',
    name: 'Frontend Interview Kit',
    category: 'Templates',
    price: 49,
    description: 'Reusable notes and exercises for interviews.',
  },
  {
    id: '4',
    name: 'UI Component Library',
    category: 'Tools',
    price: 79,
    description: 'Reusable UI patterns for React projects.',
  },
];