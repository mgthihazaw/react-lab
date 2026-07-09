import { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm";
import UserList from "./UserList";
import type { GithubUser } from "../types/githubUser";
import "./../GitHubUserList.css";
import { getGithubUsers } from "../apis/githubUsersApi";

export const GitHubUserSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (query: string) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getGithubUsers(query);
        setUsers(data);
      } catch (err) {
        setUsers([]);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() === "") {
      return;
    }

    fetchUsers(query);
  }, [query]);

  const onSubmit = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === "") {
      return;
    }
    setQuery(trimmedQuery);
  };

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
          {loading ? (
            <span>Searching GitHub...</span>
          ) : (
            <span>
              Showing {users.length} result{users.length === 1 ? "" : "s"} for "{query}"
            </span>
          )}
        </div>

        {error && <p className="github-users__error">{error}</p>}

        {!query && <p className="github-users__empty">Enter a GitHub username to search.</p>}

        {query && !loading && !error && users.length === 0 && (
          <p className="github-users__empty">No users found for "{query}".</p>
        )}

        <UserList users={users} />
      </section>
    </main>
  );
};
