import type { GithubUser } from "../types/githubUser";

type UserCardProps = {
  user: GithubUser;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <li className="github-user-card">
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
  );
};

export default UserCard;