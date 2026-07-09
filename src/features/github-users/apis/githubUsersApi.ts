import type { GithubUser } from "../types/githubUser";

type GithubUserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
};

const getGithubUsers = async (query: string): Promise<GithubUser[]> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub users: ${response.status}`);
  }

  const data = (await response.json()) as GithubUserResponse;

  return data.items;
};

export { getGithubUsers };
export type { GithubUserResponse };
