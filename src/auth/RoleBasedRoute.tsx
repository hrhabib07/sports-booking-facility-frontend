/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole: string;
}) => {
  const user = useSelector((state: any) => state.auth.user);

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleBasedRoute;
