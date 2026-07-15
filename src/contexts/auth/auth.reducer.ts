import type { AuthAction, AuthState } from "./auth.types";

export const initialAuthState: AuthState = {
  user: null,
  status: "loading",
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
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

    default:
      return state;
  }
}
