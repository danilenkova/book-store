import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, redirectTo }) => {
  const isLoggedIn = localStorage.getItem("user");
  return !isLoggedIn ? children : <Navigate to={redirectTo} replace={true} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
