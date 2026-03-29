/* eslint-disable no-unused-vars */
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("/app/form")}>
      <h3>Map</h3>
      <div className={styles.map}>
        Position: {lat}, {lng}
      </div>
    </div>
  );
}

export default Map;
