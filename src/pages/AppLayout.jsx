import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";
import User from "../components/User";

function AppLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {user && <User />}
    </div>
  );
}

export default AppLayout;
