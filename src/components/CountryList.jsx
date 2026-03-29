/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
