import { Navigate, useLocation } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return auth.logged ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
