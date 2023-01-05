import { createContext,useContext,useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    // const [auth,setAuth] = useState({});
    const [tokens,setTokens] = useState(null);

    const login = (tokens) => {
        console.log(tokens);
        setTokens(tokens);
    }

    const logout = () => {
        console.log("logout");
        setTokens({});
    }

    return (
        <AuthContext.Provider value={{tokens,setTokens,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>{
    return useContext(AuthContext);
} 