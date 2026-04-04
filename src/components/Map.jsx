import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../context/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import styles from "./Map.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const {
    position: geolocationPosition,
    isLoading: isGeolocationLoading,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { lat: mapLat, lng: mapLng } = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button
          type="position"
          onClick={getPosition}
          disabled={isGeolocationLoading}
        >
          {isGeolocationLoading ? "Loading..." : "Use my location"}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={7} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeView center={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
