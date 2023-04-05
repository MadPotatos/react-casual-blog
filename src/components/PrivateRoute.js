import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute =({component: Component, ...rest}) => {
  const {user} = useContext(ThemeContext);
  return (
    <Route    render={(props) => (
      user
        ? <Component {...props} />
        : <Navigate to='/login' replace/>
    )} />
  )
};

export default PrivateRoute;