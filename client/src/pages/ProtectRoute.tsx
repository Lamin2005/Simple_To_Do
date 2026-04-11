import { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface ProtectRouteProps {
  children: React.ReactNode;
}

function ProtectRoute({ children }: ProtectRouteProps) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return <div>{children}</div>;
}

export default ProtectRoute;
