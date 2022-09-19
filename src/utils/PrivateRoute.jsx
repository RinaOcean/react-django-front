import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contex/AuthContex";
import RestrictedAccessPage from "../components/RestrictedAccessPage/RestrictedAccessPage";

const PrivateRoute = ({Component}) => {
    let { user } = useContext(AuthContext);

    if (user) {
        if (user?.admin) {
            return <Component />;
        }
        return <RestrictedAccessPage />;
        
    }
    return <Navigate to="/login" />;
    
        
  
};

export default PrivateRoute;
