import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./component/Navbar";
import Store from './store';
import { Provider } from 'react-redux';
// import pages...
import Home from "./pages/Home";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Card from "./pages/Card";
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":page" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
