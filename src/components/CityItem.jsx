import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "../utils/helper";
import { useCities } from "../context/CitiesContext";

// eslint-disable-next-line no-unused-vars
function CityItem({ city }) {
  const { emoji, cityName, date, position, country, id } = city;
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
      >
        <span title={country} className={styles.emoji}>
          {emoji}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
