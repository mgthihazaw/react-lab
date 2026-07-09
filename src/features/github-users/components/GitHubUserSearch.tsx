import { useState } from "react";
import { SearchForm } from "./SearchForm";
import UserList from "./UserList";
import "./../GitHubUserList.css";
import { getGithubUsers } from "../apis/githubUsersApi";
import { IdleState } from "./IdleState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { useQuery } from "@tanstack/react-query";

export const GitHubUserSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const { data, isFetching, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["github-users", query],
    queryFn: () => getGithubUsers(query),
    enabled: Boolean(query),
  });

  const users = data ?? [];

  const onSubmit = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery === "") {
      return;
    }
    setQuery(inputValue);
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
          isLoading={isFetching}
          onSubmit={onSubmit}
          onChange={setInputValue}
        />

        <div className="github-users__summary" aria-live="polite">
          <span>
            Showing {users.length} result{users.length === 1 ? "" : "s"} for "{query}"
          </span>
        </div>

        {!query && <IdleState message="Enter a GitHub username to search." />}

        {isPending && isFetching && <LoadingState message="Loading GitHub Users ......" />}

        {isError && <ErrorState message={error.message} />}

        {query && !isFetching && !error && users.length === 0 && <EmptyState query={query} />}

        {isSuccess && users.length > 0 && <UserList users={users} />}

        {isSuccess && isFetching && <p>Updating results...</p>}
      </section>
    </main>
  );
};
