import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contex/AuthContex";

const PrivateRoute = ({Component}) => {
    let { user } = useContext(AuthContext);

    return (
        user ? <Component /> : <Navigate to="/login" />
    )
        
  
};

export default PrivateRoute;
