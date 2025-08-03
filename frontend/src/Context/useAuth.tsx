import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const userFromStorage = localStorage.getItem("user");
        const tokenFromStorage = localStorage.getItem("token");
        
        if (userFromStorage && tokenFromStorage) {
            try {
                const parsedUser = JSON.parse(userFromStorage);
                setUser(parsedUser);
                setToken(tokenFromStorage);
                axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromStorage}`;
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI(email, username, password).then((response) => {
            if (response) {
                toast.success("Registration successful!");
                navigate("/login");
            }
        }).catch((e) => toast.error("Server error occurred: " + e.message));
    };

    const loginUser = async (username: string, password: string) => {
        await loginAPI(username, password).then((response) => {
            if (response) {
                const responseData = response.data as any;
                const userName = responseData.Username || responseData.username || responseData.UserName || responseData.userName;
                const email = responseData.Email || responseData.email;
                const token = responseData.Token || responseData.token;
                
                localStorage.setItem("token", token);
                const userObj = {
                    userName: userName,
                    email: email
                };
                
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("Login successful!");
                navigate("/search");
            }
        }).catch((e) => toast.error("Server error occurred: " + e.message));
    };

    const logoutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
        navigate("/");
    };

    const isLoggedIn = () => {
        return !!user;
    };

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logoutUser, isLoggedIn }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);