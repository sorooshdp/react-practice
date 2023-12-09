import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email : string, password : string) => {}
})

export const AuthContextProvider = ( props : any ) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    

    useEffect(() => {
        const storedUserLoggedInInformation =
            localStorage.getItem("isLoggedIn");
        if (storedUserLoggedInInformation === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn' , '1');
        setIsLoggedIn(true)
    }
    return <AuthContext.Provider value={{ isLoggedIn : isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>{props.children}</AuthContext.Provider>
}

export default AuthContext