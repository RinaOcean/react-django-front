import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { REG_URL, TOKEN_URL } from "../utils/Urls";
import { replace } from "formik";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));            
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/file-upload", { replace: true });
        } else {
            alert("Something went wrong!");
        }

    };

    const registerUser = async (username, password, password2) => {
        const response = await fetch(REG_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password2
            })
        });
        if (response.status === 201) {
            navigate("/login", { replace: true });
        } else {

            alert("Somthing went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/", { replace: true });
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false)
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};   

