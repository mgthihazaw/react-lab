type EmptyStateProps = {
  query: string;
};

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <p className="github-users__empty">
      No users found for "{query}".
    </p>
  );
}