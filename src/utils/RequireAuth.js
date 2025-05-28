import {Navigate} from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({children}) => {
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to='/login'></Navigate>;
    }

    return children;
}