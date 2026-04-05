import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { convertToEmoji } from "../utils/helper";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geoCodingError, setGeocodingError] = useState("");
  const [country, setCountry] = useState("");
  const { createCity, isLoading } = useCities();

  useEffect(() => {
    async function fetchCityData() {
      try {
        if (!lat || !lng) return;
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.city)
          throw new Error(
            "That doesn't seem to be a city. Try clicking somewhere else.",
          );
        else {
          setGeocodingError("");
        }
        setCityName(data.city || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
        setCountry(data.countryName || "");
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id: Date.now(),
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled={isLoading}
        />
        <span title={country} className={styles.flag}>
          {emoji}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          disabled={isLoading}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          disabled={isLoading}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" disabled={isLoading}>
          {isLoading ? "Creating..." : "Add"}
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          disabled={isLoading}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
