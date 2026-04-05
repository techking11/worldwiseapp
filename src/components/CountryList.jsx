import { useCities } from "../context/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  const countries = cities.reduce((acc, city) => {
    const countryExists = acc.find((c) => c.country === city.country);
    if (!countryExists) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
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
