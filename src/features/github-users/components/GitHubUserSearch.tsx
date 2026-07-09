import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import UserList from "./UserList";
import type { GithubUser } from "../types/githubUser";
import "./../GitHubUserList.css";
import { getGithubUsers } from "../apis/githubUsersApi";
import { IdleState } from "./IdleState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";

export const GitHubUserSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async (query: string) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getGithubUsers(query, controller.signal);
        setUsers(data);
      } catch (err) {
        console.error("Error fetching GitHub users:", err, controller.signal.aborted);
        if(controller.signal.aborted) {
          return;
        }

        setUsers([]);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (query.trim() === "") {
      return;
    }

    loadUsers(query);

    // Cleanup function to abort the fetch request if the component unmounts or query changes
    return () => {
      controller.abort();
    };

  }, [query, retryCount]);

  const onSubmit = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === "") {
      return;
    }
    setQuery(trimmedQuery);
  };

  function handleRetry() {
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="github-users">
      <section className="github-users__panel">
        <div className="github-users__header">
          <p>GitHub directory</p>
          <h1>Discover developers</h1>
        </div>

        <SearchForm
          value={inputValue}
          isLoading={loading}
          onSubmit={onSubmit}
          onChange={setInputValue}
        />

        <div className="github-users__summary" aria-live="polite">
          <span>
            Showing {users.length} result{users.length === 1 ? "" : "s"} for "{query}"
          </span>
        </div>

        {!query && <IdleState message="Enter a GitHub username to search." />}

        {loading && <LoadingState message="Loading GitHub Users ......" />}

        {error && <ErrorState message={error} onRetry={handleRetry} />}

        {query && !loading && !error && users.length === 0 && <EmptyState query={query} />}

        <UserList users={users} />
      </section>
    </main>
  );
};
