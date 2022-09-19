import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contex/AuthContex";
import RestrictedAccessPage from "../components/RestrictedAccessPage/RestrictedAccessPage";

const PrivateRoute = ({Component}) => {
    let { user } = useContext(AuthContext);

    if (user) {
        return user.admin ? <Component /> : <RestrictedAccessPage />;
        
    }
    return <Navigate to="/login" />;
    
        
  
};

export default PrivateRoute;
