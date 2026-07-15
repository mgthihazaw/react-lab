import { createContext, useContext, type Dispatch } from "react"
import type { AuthAction, AuthState } from "../reducers/authReducer"

type AuthContextValue = {
    state: AuthState,
    dispatch: Dispatch<AuthAction>
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
    const auth = useContext(AuthContext);

    if( auth === undefined ){
        throw new Error("useAuth must be used within a ThemeProvider")
    }

    return auth;
}