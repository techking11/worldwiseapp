import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<h1>Welcome to your dashboard</h1>} />
          <Route path="cities" element={<h1>Cities</h1>} />
          <Route path="countries" element={<h1>Countries</h1>} />
          <Route path="form" element={<h1>Form</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
