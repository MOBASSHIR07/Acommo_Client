import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

import PropTypes from "prop-types";
import useRole from "../hooks/useRole";

const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  console.log("role is " + role);

  if (isLoading) return <LoadingSpinner />;
  if (role === "host") return children;
  

  return <Navigate to="/dashboard" replace />;
};

HostRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HostRoute;
