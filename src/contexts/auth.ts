import { createContext, useContext } from "react"
import type { AuthState, User } from "../reducers/authReducer"

// type AuthContextValue = {
//     state: AuthState,
//     dispatch: Dispatch<AuthAction>
// };

type AuthContextValue = {
  user: User | null;
  status: AuthState["status"];
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
    const auth = useContext(AuthContext);

    if( auth === undefined ){
        throw new Error("useAuth must be used within a ThemeProvider")
    }

    return auth;
}