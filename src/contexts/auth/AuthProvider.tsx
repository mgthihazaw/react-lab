import { useReducer } from "react";
import { AuthContext } from "./auth.context";
import { authReducer, initialAuthState } from "./auth.reducer";
import type { AuthProviderProps, User } from "./auth.types";

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  function login(user: User) {
    dispatch({
      type: "sessionAuthenticated",
      user,
    });
  }

  function logout() {
    dispatch({
      type: "loggedOut",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        status: state.status,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
