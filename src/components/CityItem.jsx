/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./CityItem.module.css";

// eslint-disable-next-line no-unused-vars
function CityItem({ city }) {
  const formatDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(city.date));

  return (
    <NavLink to={`/${city.id}`} className={styles.cityItem}>
      <span className={styles.emoji}>{city.emoji}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <span className={styles.date}>{formatDate}</span>
      <button className={styles.deleteBtn}>&times;</button>
    </NavLink>
  );
}

export default CityItem;
