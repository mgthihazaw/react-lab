import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import "./GitHubUserList.css";

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

type GitHubSearchResponse = {
  items: GitHubUser[];
};

const fetchGitHubUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data: GitHubSearchResponse = await response.json();
  return data.items;
}

export const GitHubUserList: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (query: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchGitHubUsers(query);
        setUsers(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if(query.trim() === "") {
      return;
    }

    fetchUsers(query);
  }, [query]);

  const handleSearch = () => {
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

        <form
          className="github-users__search"
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search by username..."
            aria-label="Search GitHub users"
          />
          <Button type="submit" disabled={inputValue.trim() === ""}>
            Search
          </Button>
        </form>

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

        {!loading && !error && users.length === 0 && (
          <p className="github-users__empty">No users found. Try another search.</p>
        )}

        {users.length > 0 && (
          <ul className="github-users__grid">
            {users.map((user) => (
              <li className="github-user-card" key={user.id}>
                <a
                  className="github-user-card__link"
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={user.avatar_url} alt={`${user.login} avatar`} />
                  <span>
                    <strong>{user.login}</strong>
                    <small>View GitHub profile</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};
