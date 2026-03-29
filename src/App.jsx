/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import "./index.css";

const BASE_URL = "http://localhost:9000";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<h1>Form</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
