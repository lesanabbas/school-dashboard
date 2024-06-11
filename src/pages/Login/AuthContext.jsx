import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        const savedLoginState = localStorage.getItem('isLogin');
        return savedLoginState ? JSON.parse(savedLoginState) : false;
    });

    useEffect(() => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
    }, [isLogin]);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
