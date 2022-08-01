import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../contex/AuthContex";

const baseURL = "http://127.0.0.1:8000/login";

const useAxios = () => {
    const { authTocens, setUser, setAuthTokens } = useContext(AuthContext);

    const axiosInsstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTocens?.access}` }
    });

    axiosInsstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTocens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTocens.refresh
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;

    });
    
    return axiosInsstance;
};

export default useAxios;