import React, { useState, useEffect } from 'react';

import { getUserAccount } from '../services/userService';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoading: true, isAuthenticated: false, token: '', account: {} });
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {},
    };
    //Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({
            ...userData,
            isLoading: false,
            isAuthenticated: true,
        });
    };

    //Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            isAuthenticated: false,
            token: '',
            account: {},
        }));
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading: false,
            };
            setUser(data);
            // setTimeout(() => {

            // }, 300 * 1000);
        } else {
            setUser({ ...userDefault, isLoading: false });
        }
    };
    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
            fetchUser();
        }
    }, []);
    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
