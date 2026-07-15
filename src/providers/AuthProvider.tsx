import React, { useReducer } from "react";
import { authReducer, inititalAuthState, type User } from "../reducers/authReducer";
import { AuthContext } from "../contexts/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, inititalAuthState);

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
