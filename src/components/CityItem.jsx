/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "../utils/helper";

// eslint-disable-next-line no-unused-vars
function CityItem({ city }) {
  const { emoji, cityName, date, position, id } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <span className={styles.date}>{formatDate(date)}</span>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
