import type { ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type AuthState = {
  user: User | null;
  status: AuthStatus;
};

export type AuthAction =
  | {
      type: "sessionLoading";
    }
  | {
      type: "sessionAuthenticated";
      user: User;
    }
  | {
      type: "sessionAnonymous";
    }
  | {
      type: "loggedOut";
    };

export type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  login: (user: User) => void;
  logout: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
