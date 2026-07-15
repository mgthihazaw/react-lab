import React, { useReducer } from "react";
import { authReducer, inititalAuthState } from "../reducers/authReducer";
import { AuthContext } from "../contexts/auth";

export function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [state, dispatch] = useReducer(authReducer, inititalAuthState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}