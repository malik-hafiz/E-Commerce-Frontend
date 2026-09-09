import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import NewArrivals from "./pages/NewArrivals";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/Shop" element={<Shop />} />

        <Route path="/navbar" element={<Navbar />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route
  path="/new-arrivals"
  element={<NewArrivals />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;