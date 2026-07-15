export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user?: User;
  status: "loading" | "authenticated" | "anonymous";
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

export const inititalAuthState: AuthState = {
  user: null,
  status: "loading",
};

export function authReducer(_state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "sessionLoading":
      return {
        user: null,
        status: "loading",
      };

    case "sessionAuthenticated":
      return {
        user: action.user,
        status: "authenticated",
      };

    case "sessionAnonymous":
    case "loggedOut":
      return {
        user: null,
        status: "anonymous",
      };
  }
}
