import {createContext} from 'react';

type AuthSatatus = {
    authStatus:boolean;
    setAuthStatus: (status: boolean) => void;
}

export const AuthContext = createContext<AuthSatatus>({
    authStatus: false,
    setAuthStatus:() => {}
})

export const AuthProvider = AuthContext.Provider;

export default AuthContext;