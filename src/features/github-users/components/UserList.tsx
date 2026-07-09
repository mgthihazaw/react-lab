import type { GithubUser } from "../types/githubUser";
import UserCard from "./UserCard";

type UserListProps = {
  users: GithubUser[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <ul className="github-users__grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;